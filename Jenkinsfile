pipeline {
    agent any
    stages {
        stage('Prepare') {
            steps {
                echo 'Socket Exporter Prepare Stage'
                sh 'node -v'
                sh 'npm -v'

            }
        }
        stage('Build') {
            steps {
                echo 'Socket Exporter Build Stage'
                sh 'npm install'

            }
        }
        stage('Test') {
            steps {
                echo 'Kafene API Test Stage'
                echo 'Warning : Skipping Tests'
                // sh 'db-migrate up -e test'
                // sh 'npm run test'
            }
        }

    }
}
