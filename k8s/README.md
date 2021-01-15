# Müll Deployment - Docker & Kubernetes

This directory covers everything related to our prod application deployment on Kubernetes.

- [Müll Deployment - Docker & Kubernetes](#müll-deployment---docker---kubernetes)
  - [Docker Images](#docker-images)
    - [Automated Docker Builds](#automated-docker-builds)
    - [Manual Builds](#manual-builds)
  - [Müll Prod Deployment](#müll-prod-deployment)
    - [Step 1: Deploying `ingress-nginx`](#step-1--deploying--ingress-nginx-)
    - [Step 2: Deploying `cert-manager`](#step-2--deploying--cert-manager-)
    - [Step 3: Deploying `Müll`](#step-3--deploying--m-ll-)

## Docker Images

### Automated Docker Builds

DockerHub AutoBuilds are currently set to build the [`mull-backend`](https://hub.docker.com/repository/docker/ritchellegmp/mull-backend) and [`mull-frontend`](https://hub.docker.com/repository/docker/ritchellegmp/mull-frontend) images tagged as `latest`. AutoBuilds will rebuild everytime a new commit has been pushed to develop.

### Manual Builds

You can also build these images on your own.

```bash
docker build -t ritchellegmp/mull-backend:<tag> -f apps/mull-api/Dockerfile .
docker build -t ritchellegmp/mull-frontend:<tag> -f apps/mull-ui/Dockerfile .
```

Push to DockerHub (ensure you have push permissions to the repos)

```bash
docker push ritchellegmp/mull-backend:<tag>
docker push ritchellegmp/mull-frontend:<tag>
```

## Müll Prod Deployment

Deployment of our Müll application on a GCP Kubernetes cluster using:

- [ingress-nginx](https://kubernetes.github.io/ingress-nginx/) as the Ingress controller + reverse proxy and load balancer using NGINX
- [cert-manager](https://cert-manager.io/) for SSL certification

Pre-requisites:

- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm](https://helm.sh/) v3+
- GCP Kubernetes cluster
- Connectivity and authentication to your cluster using `gcloud auth login`

### Step 1: Deploying `ingress-nginx`

We must first set up the ingress-nginx controller that will be responsible for our Ingress rules, as well as to provide reverse proxy and load balancing services to our application.

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

kubectl create namespace ingress-nginx
helm install -n ingress-nginx ingress-nginx ingress-nginx/ingress-nginx
```

Now you can run `kubectl get service -n ingress-nginx` and you will see a Service of type `LoadBalancer` with an external IP that GCP has allocated.

### Step 2: Deploying `cert-manager`

Next, we will be deploying cert-manager and it is used to create our SSL certificate using LetsEncrypt as a CA.

```bash
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.16.1/cert-manager.yaml
```

### Step 3: Deploying `Müll`

Before deploying the application, our env vars must be created into a secret for our `mull-backend` pod to reference.

```bash
kubectl create namespace mull
kubectl create secret generic mull-env-vars --from-env-file=<path-to-your-.env-file> -n mull
```

Lastly, we will deploy the Kubernetes manifests which will deploy the entire application stack.

```bash
kubectl apply -f manifests/
```
