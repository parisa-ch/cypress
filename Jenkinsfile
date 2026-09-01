pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'                    // ✅ Use 'bat' for Windows
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run --headless --browser chrome'   // ✅ Use 'bat' for Windows
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
        }
        failure {
            echo '❌ Cypress tests failed! Check the artifacts for screenshots and videos.'
        }
        success {
            echo '✅ All Cypress tests passed!'
        }
    }
}