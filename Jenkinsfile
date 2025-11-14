pipeline {
    agent any

    environment {
        PROJECT = "DevHub-frontend"
        DOCKERHUB_ID = "goonerd"
        DATE = sh(script: "date +%Y%m%d", returnStdout: true).trim()
        BUILD_TAG = "${PROJECT}-${DATE}-${BUILD_NUMBER}".toLowerCase()
        IMAGE_NAME = "${DOCKERHUB_ID}/${PROJECT}".toLowerCase()
        INFRA_REPO = "https://github.com/Goonerd17/DevHub-infra.git"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo "🧹 Cleaning workspace..."
                deleteDir()
            }
        }

        stage('Checkout Frontend') {
            steps {
                echo "🔄 Checking out frontend repository..."
                git branch: 'dev', url: 'https://github.com/Goonerd17/DevHub-frontend.git'
                // 또는 checkout scm을 사용하면 현재 job 브랜치 자동 체크아웃 가능
            }
        }

        stage('Install & Build') {
            steps {
                echo "📦 Installing Node.js dependencies..."
                sh 'npm install'

                echo "🏗 Building frontend with Vite..."
                sh 'npm run build'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh """
                        echo "$PASS" | docker login -u "$USER" --password-stdin
                        docker build -t ${IMAGE_NAME}:${BUILD_TAG} .
                        docker push ${IMAGE_NAME}:${BUILD_TAG}
                        docker logout
                    """
                }
            }
        }

        stage('Update Infra Repo') {
            steps {
                script {
                    // 현재 브랜치 가져오기
                    def currentBranch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                    echo "📦 Current branch: ${currentBranch}"

                    // 브랜치별 디렉토리 매핑
                    def targetDir = ""
                    def targetBranch = ""
                    if (currentBranch == "dev") {
                        targetDir = "infra/k8s/dev/devhub-frontend"
                        targetBranch = "dev"
                    } else if (currentBranch == "main") {
                        targetDir = "infra/k8s/prd/devhub-frontend"
                        targetBranch = "main"
                    } else {
                        error "❌ Unsupported branch: ${currentBranch}. Only 'dev' or 'main' are allowed."
                    }

                    withCredentials([usernamePassword(credentialsId: 'github', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                        sh 'git config --global user.name "Jenkins"'
                        sh 'git config --global user.email "jenkins@devhub.local"'

                        // Infra 레포 클론
                        sh "git clone -b ${targetBranch} https://${GIT_USER}:${GIT_TOKEN}@github.com/Goonerd17/DevHub-infra.git"

                        dir("DevHub-infra/${targetDir}") {
                            sh """
                                echo "📝 Updating deployment.yml image tag..."
                                sed -i "s#image: goonerd/devhub-frontend:.*#image: ${IMAGE_NAME}:${BUILD_TAG}#" deployment.yml
                                grep 'image:' deployment.yml
                            """

                            // Git add, 커밋, 푸시
                            sh """
                                git add deployment.yml
                                git commit -m '[CI] Update frontend image to ${BUILD_TAG}' --allow-empty
                                git push origin main
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build & Infra update complete!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}