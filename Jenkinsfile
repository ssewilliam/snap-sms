pipeline {
    agent { docker { image 'node:10.16.0' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}