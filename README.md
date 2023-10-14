# SPOT (Prevents Vendor Lock In and ALlows Small Devs save cloud costs and enjoy automated cloud infrastructure deployment and management)


#Workflow



Query ----> LLM Agent ---> Resource Specification Recommender ---> Cloud Cost Optimizer ----> Automated Cloud Agnostic Deployment




#Query:




Queries can be as abstract as possible. No background in cloud deployment required.

General Cloud Recommendation:
User: "I have a web application. It's a small e-commerce site. I expect around 10,000 visitors per day. What's the best cloud provider and instance type for me?"

Cost-Effective Deployment Request:
User: "I need to deploy a database server and a front-end application. My budget is limited to $50 per month. What are my options?"

Scalability Requirement:
User: "I am developing a mobile app. I anticipate a rapid increase in users after the launch. Which cloud provider offers the best scalability options for mobile applications?"

Specific Cloud Provider Inquiry:
User: "I'm already using AWS for some services. Can you recommend an instance type and region within AWS for my machine learning backend?"

Disaster Recovery Focus:
User: "I want to ensure my application has a disaster recovery plan. How can I deploy my services redundantly across different regions?"

Specific Technical Requirement:
User: "My application relies heavily on GPU processing. Which cloud provider offers the best GPU instances, and how can I deploy my application there?"

Containerization Preference:
User: "I prefer using containers. Can you recommend a managed Kubernetes service and help me deploy my microservices architecture?"

Compliance and Security Concerns:
User: "My application deals with sensitive user data. Which cloud provider is known for its strong security measures and compliance standards?"

Specific Software Stack:
User: "I am using a Node.js backend with a MongoDB database. Which cloud provider offers seamless integration for these technologies, and how can I deploy them?"

Integration and Third-Party Services:
User: "I need to integrate my application with third-party APIs and services. Which cloud provider offers easy integration options, and how can I set up these connections?"




#LLM Agent:





Resource Specification Recommender:

Example Input: "I have a web application. It's a small e-commerce site. I expect around 10,000 visitors per day. What's the best cloud provider and instance type for me?"

Output:        {"Resource 1": Web Hosting Platform,
                "Resource 2": Database,
                "Resource 3": Content Delivery Network,
                "Resource 4": Load Balancer,
                "Resource 5": Auto Scaling,
                "Resource 6": Security,
                "Resource 7": Monitoring and Analytics} 




                

                
Cost Optimizer:

Makes cloud platform specific api calls (Example: AWS/GCP/Azure cloud pricing API) to create a SQL database with all spot and on demand cloud resource pricing
Output is a list of each type of resource in ascending order with respect to cost

Example Input: {"Resource 1": Web Hosting Platform,
                "Resource 2": Database,
                "Resource 3": Content Delivery Network,
                "Resource 4": Load Balancer,
                "Resource 5": Auto Scaling,
                "Resource 6": Security,
                "Resource 7": Monitoring and Analytics} 

Output: {"Optimal Resource List 1": ["AWS Compute Engine", 
         "Optimal Resource List 2": ["Amazon RDS",
         "Optimal Resource List 3": ["Amazon CloudFront",







Cross Cloud/Single Cloud Setup:

Example Input:
LLM Agent: "Are you okay with having cross cloud dependencies"
User: "Yes"

Output:

Setup the resources with Optimal





