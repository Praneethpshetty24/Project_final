@echo off
echo Starting Minikube deployment...

REM Check if Minikube is running
minikube status || (
    echo Starting Minikube...
    minikube start
)

REM Set docker to use Minikube's daemon
@FOR /f "tokens=*" %%i IN ('minikube -p minikube docker-env --shell cmd') DO @%%i

REM Build the Docker image
echo Building Docker image...
docker build -t todo-app:latest .

REM Apply Kubernetes configuration
echo Deploying to Minikube...
kubectl apply -f k8s/deployment.yaml

REM Wait for deployment
echo Waiting for deployment to be ready...
kubectl wait --for=condition=available deployment/todo-app --timeout=60s

REM Get URL
echo App URL:
minikube service todo-app-service --url
