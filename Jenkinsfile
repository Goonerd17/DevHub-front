pipeline {
    agent any

    environment {
        PROJECT = "DevHub-front"
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

        stage('Checkout front') {
            steps {
                echo "🔄 Checking out front repository..."
                git branch: 'dev', url: 'https://github.com/Goonerd17/DevHub-front.git'
            }
        }

        stage('Install Dependencies & Build Frontend') {
            steps {
                echo "📦 Installing Node.js dependencies..."
                sh 'npm install'

                echo "🏗 Building frontend with Vite..."
                sh 'npm run build'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo "$PASS" | docker login -u "$USER" --password-stdin'
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo "🛠 Building Docker image..."
                sh "docker build -t $IMAGE_NAME:$BUILD_TAG ."
            }
        }

        stage('Docker Push') {
            steps {
                echo "📤 Pushing Docker image..."
                sh "docker push $IMAGE_NAME:$BUILD_TAG"
                sh "docker logout"
            }
        }

        stage('Update Front Infra Repo') {
          steps {
              withCredentials([usernamePassword(credentialsId: 'github', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                  dir('DevHub-infra/infra/k8s/devhub-frontend') {
                    sh "sed -i 's#image: goonerd/DevHub-front:.*#image: ${IMAGE_NAME}:${BUILD_TAG}#' ./deployment.yml"

                    sh "git --git-dir=./.git --work-tree=./ config user.name 'Jenkins'"
                    sh "git --git-dir=./.git --work-tree=./ config user.email 'jenkins@devhub.local'"

                    sh """
                        git --git-dir=./.git --work-tree=./ add ./deployment.yml
                        git --git-dir=./.git --work-tree=./ commit -m '[CI] Update front image to ${BUILD_TAG}' --allow-empty
                        git --git-dir=./.git --work-tree=./ push origin dev
                    """
                }
              }
          }
      }
    }

    post {
        success {
            echo "✅ Build and Infra update complete"
        }
        failure {
            echo "❌ Pipeline failed"
        }
    }
}