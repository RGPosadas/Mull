# Kubernetes

This directory covers everything related to Kubernetes.

- [Müll Deployment](#müll-deployment)
  - [Deployment Steps](#deployment-steps)

# Müll Deployment

The application in both dev and prod environments are deployed through ArgoCD.

Pre-requisites:

- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- A kubernetes cluster (minikube, GKE, etc)

## Deployment Steps

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
   $ cd k8s/argocd-apps
   $ kubectl apply -f .
   ```

3. Login to ArgoCD

   - On minikube/local cluster:

     1. Get the password by getting the argocd-repo-server pod name

        `$ kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server -o name | cut -d'/' -f 2`

     2. Port-forward the argocd service

        `$ kubectl port-forward svc/argocd-server -n argocd 8080:443`

     3. Go to `localhost:8080` and set
        ```
        user: admin
        password: The name of the Argo CD server pod
        ```

   - On GKE:

     TODO: Create safe login workflow (for now, contact Ritchelle please)

4. Sync Applications

   Once logged in to ArgoCD, click `SYNC` on each application environment to sync the ArgoCD applications, which will finally deploy the Müll applications.

5. Access the Applications

   We currently don't have an ingress installed, so we have to port-forward the frontend and backend.

   ```
   $ export MULL_POD=$(kubectl get pods -n mull-[dev|prod] | awk '{print $1}' | sed -n '2 p')
   $ kubectl -n mull-[dev|prod] port-forward $MULL_POD 9000:80 3333
   ```

   Access the frontend using `localhost:9000`, and access the backend using `localhost:3333/api`.
