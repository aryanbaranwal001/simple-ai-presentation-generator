from mira_sdk import MiraClient, CompoundFlow
from mira_sdk.exceptions import FlowError
import sys



client = MiraClient(config={"API_KEY": 'sb-d3b5f4fe10ddfdbea5e756283c82918f'})


# Update argument count check and handling
if len(sys.argv) != 6:
    print("Usage: python local.py <topic> <addPrompt> <pages> <theme> <dimensions>")
    sys.exit(1)

# Correct argument order
topic = sys.argv[1]
addPrompt = sys.argv[2]
pages = sys.argv[3]
theme = sys.argv[4]
dimensions = sys.argv[5]


flow = CompoundFlow(source="./compoundflow.yaml")                    # Load flow configuration
input_dict = {
  "topic": f"{topic}",
  "addPrompt": f"{addPrompt}",
  "pages":f"{pages}",
  "theme":f"{theme}",
  "dimensions":f"{dimensions}"
  }                               # Prepare test input


print("Input to Mira API:", input_dict)
response = client.flow.test(flow, input_dict)
print("Response from Mira API:", response)





try:
    response = client.flow.test(flow, input_dict)
    print(response)
except FlowError as e:
    print(f"FlowError: {e}")
    sys.exit(1)
except Exception as e:
    print(f"Unexpected error: {e}")
    sys.exit(1)



















