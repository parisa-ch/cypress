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
                bat 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run --headless --browser chrome'
            }
        }
    }

    post {
        always {
            // Archive artifacts
            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
            
            // ★★★ PUBLISH TEST RESULTS TO JENKINS UI ★★★
            junit 'test-results/*.xml'
        }
        failure {
            echo '❌ Cypress tests failed! Check the reports and artifacts.'
        }
        success {
            echo '✅ All Cypress tests passed!'
        }
    }
}