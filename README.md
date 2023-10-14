# SPOT (Prevents Vendor Lock In and Allows Small Devs save cloud costs and enjoy automated cloud infrastructure deployment and management)

## Customer Need / Opportunity
Currently, the glocal cloud computing market is worth hundreds of billions dollars. $593 billion was spent on cloud deployments this year alone. Many small business (66% of small tech companies) and individual developers tend to deploy their applications on the cloud in order to scale and cut costs. However, deploying incorrectly or using excessive resources can completely break one's bank - and unfortunately, it is very common. According to CloudZero, only 3 out of 10 organizations know exactly where their cloud costs are going. This is because of the vast and dense information associated with cloud resources and deployments, which many small business and developers cannot understand without significant experience in the field or without investing a lot of time in research. Ideally, the time and energy of developers should go to building and perfecting their applications and not worrying about the exponential cost of their cloud resources. Having an application that would automate the customer deployments as well as recommend them the optimal amount of resources needed as well as the optimal pricing would be ideal. 

## Workflow



Query ----> LLM Agent ---> Resource Specification Recommender ---> Cloud Cost Optimizer ----> Automated Cloud Agnostic Deployment

## Customer Workflow
Query ----> All Necessary Resources + Optimized Price for Resources ----> Automated Cloud Agnostic Deployment


## Query:
Queries can be as abstract as possible. No background in cloud deployment required.

### General Cloud Recommendation:
User: "I have a web application. It's a small e-commerce site. I expect around 10,000 visitors per day. What's the best cloud provider and instance type for me?"

### Cost-Effective Deployment Request:
User: "I need to deploy a database server and a front-end application. My budget is limited to $50 per month. What are my options?"

### Scalability Requirement:
User: "I am developing a mobile app. I anticipate a rapid increase in users after the launch. Which cloud provider offers the best scalability options for mobile applications?"

### Specific Cloud Provider Inquiry:
User: "I'm already using AWS for some services. Can you recommend an instance type and region within AWS for my machine learning backend?"

### Disaster Recovery Focus:
User: "I want to ensure my application has a disaster recovery plan. How can I deploy my services redundantly across different regions?"

### Specific Technical Requirement:
User: "My application relies heavily on GPU processing. Which cloud provider offers the best GPU instances, and how can I deploy my application there?"

### Containerization Preference:
User: "I prefer using containers. Can you recommend a managed Kubernetes service and help me deploy my microservices architecture?"

### Compliance and Security Concerns:
User: "My application deals with sensitive user data. Which cloud provider is known for its strong security measures and compliance standards?"

### Specific Software Stack:
User: "I am using a Node.js backend with a MongoDB database. Which cloud provider offers seamless integration for these technologies, and how can I deploy them?"

### Integration and Third-Party Services:
User: "I need to integrate my application with third-party APIs and services. Which cloud provider offers easy integration options, and how can I set up these connections?"


## LLM Agent:

Resource Specification Recommender:

Example Input: "I have a web application. It's a small e-commerce site. I expect around 10,000 visitors per day. What's the best cloud provider and instance type for me?"

Output:        {"Resource 1": Web Hosting Platform,
                "Resource 2": Database,
                "Resource 3": Content Delivery Network,
                "Resource 4": Load Balancer,
                "Resource 5": Auto Scaling,
                "Resource 6": Security,
                "Resource 7": Monitoring and Analytics} 


Choice of Cloud Platform + Cost Optimizer:

Now the user has a choice. Either provide the cloud provider or opt for the most cost effective effective cloud platform by considering monthly costs to deploy all resources.
Each cloud provider requires different resources and dependencies so their costs could be wildly different. 

Case 1: If the user provides their own cloud platform and lets say the platform provided is AWS, 

Example Input: {"Resource 1": Web Hosting Platform,
                "Resource 2": Database,
                "Resource 3": Content Delivery Network,
                "Resource 4": Load Balancer,
                "Resource 5": Auto Scaling,
                "Resource 6": Security,
                "Resource 7": Monitoring and Analytics} 

{
  "Monthly Projected Cost": "$500",
  "Web Hosting Platform": [("AWS Compute Engine", "$200", "GCP Compute Engine", "$180", "Azure Virtual Machines", "$220")],
  "Database": [("Amazon RDS", "$150", "Google Cloud SQL", "$140", "Azure Database", "$160")],
  "Content Delivery Network": [("Amazon CloudFront", "$50", "Google Cloud CDN", "$45", "Azure CDN", "$55")],
  "Load Balancer": [("Amazon Elastic Load Balancing", "$30", "Google Cloud Load Balancing", "$28", "Azure Load Balancer", "$35")],
  "Auto Scaling": [("AWS Auto Scaling Groups", "$20", "Google Cloud Instance Groups", "$18", "Azure Virtual Machine Scale Sets", "$22")],
  "Security": [("AWS WAF and Shield", "$25", "Google Cloud Armor", "$23", "Azure DDoS Protection", "$28")],
  "Monitoring and Analytics": [("AWS CloudWatch", "$10", "Google Cloud Monitoring", "$9", "Azure Monitor", "$11")]
}



Case 2: If the user opts for the most cost effective cloud provider, list out the cheapest resource types for each cloud provider, aggregate the costs for each of them and choose 
        the cloud platform that ensures lowest monthly costs,


Example Input: {"Resource 1": Web Hosting Platform,
                "Resource 2": Database,
                "Resource 3": Content Delivery Network,
                "Resource 4": Load Balancer,
                "Resource 5": Auto Scaling,
                "Resource 6": Security,
                "Resource 7": Monitoring and Analytics} 

{
  "Cost Cloud Provider": "AWS",
  "Monthly Projected Cost": "$16534/month",
  "Web Hosting Platform": [("AWS Compute Engine", "GCP Compute Engine", "Azure Virtual Machines")],
  "Database": [("Amazon RDS", "Google Cloud SQL", "Azure Database")],
  "Content Delivery Network": [("Amazon CloudFront", "Google Cloud CDN", "Azure CDN")],
  "Load Balancer": [("Amazon Elastic Load Balancing", "Google Cloud Load Balancing", "Azure Load Balancer")],
  "Auto Scaling": [("AWS Auto Scaling Groups", "Google Cloud Instance Groups", "Azure Virtual Machine Scale Sets")],
  "Security": [("AWS WAF and Shield", "Google Cloud Armor", "Azure DDoS Protection")],
  "Monitoring and Analytics": [("AWS CloudWatch", "Google Cloud Monitoring", "Azure Monitor")]
}


        


Makes cloud platform specific api calls (Example: AWS/GCP/Azure cloud pricing API) to create a SQL database with all spot and on demand cloud resource pricing
Output is a list of each type of resource in ascending order with respect to cost






Example Input:
LLM Agent: "Are you okay with having cross cloud dependencies"
User: "Yes"

Output:
Setup the resources with most optimal resource types without bothering about the cloud platform each resource belongs to. Resource 1 could be an AWS resource and resource 2 could be a GCP resource but the automated deployment will deploy without considering differences in the cloud providers

Example Input: 
LLM Agent: "Are you okay with having cross cloud dependencies"
User: "No"

Output:
Setup the resources with most optimal resource types after ensuring that each resource belongs to the same cloud provider. So if resource 1 is AWS, find the resource in the optimal resource list 2 that also belongs to AWS. 



Automate Cloud Agnostic Infrastructure Deployment:

Abstract Class with separate implementations for cloud infra deployment for each cloud provider (example: AWS deployment, GCP deployment, Azure deployment)
The resources selected by the resource specification recommender and the cost optimizer will be sent as input to this abstract class which will be instances in the constructor of the abstract class. The entire deployment process is basically mutliple layers of abstraction added on top of an IAC platform PULUMI which means that the user does not need to bother about anything cloud specific. 

```
class CloudInfrastructure(ABC):
    @abstractmethod
    def __init__(self, gcp_proj, number_of_vms, public_key, vm_size, existing_net, cloud_platform, network_id, subnet_id,security_group_id, resource_group,
             network_interface, count, instances, amis, vpc_name, resource_group_name, security_group_name,
             firewall_rule_name, subnet_name, public_ip, network_interface_name, vm_name, computer_name, os_disk_name,
             allow_ssh_name, ig_name, rt_name, pr_name, psa_name, ip_assoc):
            self.gcp_proj = gcp_proj
            self.number_of_vms = number_of_vms
            self.public_key = public_key
            self.vm_size = vm_size
            self.existing_net = existing_net
            self.cloud_platform = cloud_platform
            self.network_id = network_id
            self.subnet_id = subnet_id
            self.security_group_id = security_group_id
            self.resource_group = resource_group
            self.network_interface = network_interface
            self.count = count
            self.instances = instances
            self.amis = amis
            self.vpc_name = vpc_name
            self.resource_group_name = resource_group_name
            self.security_group_name = security_group_name
            self.firewall_rule_name = firewall_rule_name
            self.subnet_name = subnet_name
            self.public_ip = public_ip
            self.network_interface_name = network_interface_name
            self.vm_name = vm_name
            self.os_disk_name = os_disk_name
            self.computer_name = computer_name
            self.allow_ssh_name = allow_ssh_name
            self.ig_name = ig_name
            self.rt_name = rt_name
            self.pr_name = pr_name
            self.psa_name = psa_name
            self.ip_assoc = ip_assoc

      @abstractmethod
      def deployNetwork(self):
          pass

      @abstractmethod
      def deployVM(self):
          pass

      ......

```

Then after the cloud provider is identified, the infrastructure gets deployed using PULUMI (Infrastructure AS Code). PULUMI allows cloud infrastruture deployment using your favorite programming language (In this case, our backend will be built using Typescript and Python). PULUMI deploys and manages the clients state of cloud infra all by itself so that the user does not need to worry at all about what their current infra looks like. It also validates the cloud credentials for the user before it gets deployed


This is an snippet of the GCP implementation of the deployment process:

```
class GCPInfrastructure(CloudInfrastructure):
    def __init__(self, gcp_project, number_of_vms, public_key, vm_size, cloud_platform, network_id, subnet_id, security_group_id, resource_group,
                 network_interface, count, instance_type, ami, vpc_name, resource_group_name, security_group_name, firewall_rule_name, subnet_name,
                 public_ip, network_interface_name, vm_name, computer_name, os_disk_name, allow_ssh_name, ig_name, rt_name,
                 pr_name, psa_name, ip_assoc):
        self.gcp_project = gcp_project
        self.number_of_vms = number_of_vms
        self.public_key = public_key
        self.vm_size = vm_size
        self.cloud_platform = cloud_platform
        self.network_id = network_id
        self.subnet_id = subnet_id
        self.security_group_id = security_group_id
        self.resource_group = resource_group
        self.network_interface = network_interface
        self.count = count
        self.instance_type = instance_type
        self.ami = ami
        self.vpc_name = vpc_name
        self.resource_group_name = resource_group_name
        self.security_group_name = security_group_name
        self.firewall_rule_name = firewall_rule_name
        self.subnet_name = subnet_name
        self.public_ip = public_ip
        self.network_interface_name = network_interface_name
        self.vm_name = vm_name
        self.computer_name = computer_name
        self.os_disk_name = os_disk_name
        self.allow_ssh_name = allow_ssh_name
        self.ig_name = ig_name
        self.rt_name = rt_name
        self.pr_name = pr_name
        self.psa_name = psa_name
        self.ip_assoc = ip_assoc


    def deployNetwork(self):
        network = gcp.compute.Network(self.vpc_name, auto_create_subnetworks = True,)
        self.network_id= network.id
        ssh_firewall_rule = gcp.compute.Firewall(self.firewall_rule_name,
                                                name=self.allow_ssh_name,
                                                network=network.self_link,
                                                allows=[{
                                                    "protocol": "tcp",
                                                    "ports": ["22"],
                                                }],
                                                source_ranges=["0.0.0.0/0"])
        pulumi.export(f"gcp_vpc {self.count}", network)
        pulumi.export(f"gcp_vpc_name {self.count}", network.name)
    def deployVM(self):
        self.count += 1
        if not self.network_id:
            print("Deploying VM " + self.vm_name[self.count - 1] + " in the region closest to your ip in the new VPC")
            print("------------------------------------------------------------------------")
            self.deployNetwork()
        else:
           print("Deploying VM " + self.vm_name[self.count - 1] + " in the region closest to your ip in the existing VPC")
           print("------------------------------------------------------------------------")
        region = find_closest_gcp_region(get_user_location_from_ip())
        eip_name = self.public_ip[self.count - 1]
        external_ip = gcp.compute.Address(eip_name,
                                          region=region)
        vm = gcp.compute.Instance(self.vm_name[self.count - 1],
                                machine_type=self.instance_type,
                                zone=region+"-a",
                                boot_disk={
                                    "initializeParams": {
                                        "image": "centos-7-v20230711",
                                    },
                                },
                                network_interfaces=[{
                                    "network": self.network_id,
                                    "access_configs": [{
                                        "nat_ip": external_ip.address
                                    }],
                                }],
                                metadata={
                                    "sshKeys": "aryaman2003:" + self.public_key,
                                })
        pulumi.export(f"gcp_vm_name {self.count}", vm.name)
        pulumi.export(f"gcp_vm_id {self.count}", vm.id)
        pulumi.export(f"gcp_vm_instance_type {self.count}", vm.machine_type)
        pulumi.export(f"gcp_external_ip {self.count}", external_ip)

        ......

```

The user also has the choice of integrating their existing infrastructure with their new updates, so that they do not need to create separate resources every time they deploy. This saves cloud costs and alows reusability of infra which also prevents capacity constraint issues.  

```
 if not self.network_id:
            print("Deploying VM " + self.vm_name[self.count - 1] + " in the region closest to your ip in the new VPC")
            print("------------------------------------------------------------------------")
            self.deployNetwork()
        else:
           print("Deploying VM " + self.vm_name[self.count - 1] + " in the region closest to your ip in the existing VPC")
           print("------------------------------------------------------------------------")
        region = find_closest_gcp_region(get_user_location_from_ip())

```

Finally once everything gets deployed a stack output is generated which contains information about how the clients can ssh into their applications on the cloud. The stack output gets communicated to the user through the LLM Agent. The stack output contains information about what are the ids of the virtual machine deployed or what are the ids of the Virtual Private Cloud deployed so that the user can use these external ids to ssh into the resource.

Firewall rules also get setup automatically securing the resource and the user's public key gets written into the authorized_keys file of the resource so that the key exchange process works efficiently.



