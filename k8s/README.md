# Kubernetes

This directory covers everything related to Kubernetes.

## LitterRally Deployment

The application in both dev and prod environments are deplloyed through ArgoCD.

Pre-requisites:

- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

### Deployment Steps

1. Deploy ArgoCD

```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

2. Deploy Dev and Prod Environments

```
cd k8s/argocd-apps
kubectl apply -f .
```

3. Login to ArgoCD

TODO: Create safe workflow

4. Sync Applications
