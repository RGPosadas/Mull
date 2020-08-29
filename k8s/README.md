# Kubernetes

This directory covers everything related to Kubernetes.

## LitterRally Deployment

The application in both dev and prod environments are deployed through ArgoCD.

Pre-requisites:

- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- A kubernetes cluster (minikube, GKE, etc)

### Deployment Steps

1. Deploy ArgoCD

   ArgoCD will be the controller who will watch over our application environment states, and ensures that the live kubernetes resources are truly matched to the GitHub repository kubernetes manifests (GitOps).

```
$ kubectl create namespace argocd
$ kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# If on GKE, give yourself permission to deploy cluster roles
$ gcloud auth login
$ kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user="$(gcloud config get-value account)"
```

2. Deploy Dev and Prod Environments

   Now that ArgoCD is deployed, we need to tell ArgoCD how exactly to control/watch these kubernetes manifests.

```
cd k8s/argocd-apps
kubectl apply -f .
```

3. Login to ArgoCD

   TODO: Create safe login workflow (for now, contact Ritchelle please)

4. Sync Applications

   Once logged in to ArgoCD, click `SYNC` on each application environment to sync the ArgoCD applications, which will finally deploy the LitterRally applications.
