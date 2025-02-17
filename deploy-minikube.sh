#!/bin/bash

# Start Minikube if not running
if ! minikube status > /dev/null 2>&1; then
    echo "Starting Minikube..."
    minikube start
fi

# Set docker to use Minikube's daemon
eval $(minikube docker-env)

# Build the Docker image
echo "Building Docker image..."
docker build -t todo-app:latest .

# Apply Kubernetes configuration
echo "Deploying to Minikube..."
kubectl apply -f k8s/deployment.yaml

# Wait for deployment
echo "Waiting for deployment to be ready..."
kubectl wait --for=condition=available deployment/todo-app --timeout=60s

# Get URL
echo "App URL: $(minikube service todo-app-service --url)"
