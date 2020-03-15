pipeline {
    agent any
    stages {
        stage('Prepare') {
            steps {
                echo 'Socket Exporter Prepare Stage'
                nodejs(nodeJSInstallationName: 'NodeV10') {
                    echo "Checking npm version"
                    sh 'npm -v'
                }

            }
        }
        stage('Build') {
            steps {
                echo 'Socket Exporter Build Stage'
                nodejs(nodeJSInstallationName: 'NodeV10') {
                    echo "Installing dependencies"
                    sh 'npm install'
                }

            }
        }
        stage('Test') {
            steps {
                echo 'Socket Exporter Stage'
                echo 'Warning : Skipping Tests'
                // sh 'db-migrate up -e test'
                // sh 'npm run test'
            }
        }

    }
}
