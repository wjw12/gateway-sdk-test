import { Gateway, WalletTypeEnum } from '@gateway-dao/sdk';

// example: https://github.com/Gateway-DAO/gateway-js-sdk/tree/develop

const gateway = new Gateway({
  wallet: {
    privateKey: process.env.PRIVATE_KEY,
    walletType: WalletTypeEnum.Ethereum,
  },
});

async function createModel() {
  try {
    const dataModelBody = {
    title: 'Heurist AI Images',
    description: 'A data model for images generated by Heurist',
    schema: {
      type: 'object',
      title: 'Heurist AI Images',
      default: {},
      required: ["prompt", "model_id"],
      properties: {
        prompt: {
          type: 'string',
          title: 'Prompt',
        },
        model_id: {
          type: 'string',
          title: 'Model ID'
        },
        negative_prompt: {
          type: 'string',
          title: 'Negative Prompt',
        },
        num_iterations: {
          type: 'number',
          title: "Number of Iterations"
        },
        guidance_scale: {
          type: 'number',
          title: "Guidance Scale"
        },
        seed: {
          type: 'number',
          title: "Seed"
        },
        image_url: {
          type: 'string',
          title: 'Image URL'
        }
      },
      additionalProperties: false,
    },
  };
  result = await gateway.dataModel.create(dataModelBody);
  } catch (error) {
    console.log(error);
  }
}

const ADMIN_ADDRESS = '0x3CD0424EFbB7d75332a4385160bC81c15D0705Fe';

async function upload() {
  try {
    const claim = {
      prompt: 'test prompt',
      model_id: 'test model id',
    };
    const id = await gateway.dataAsset.createStructured({
      name: 'THIS IS A TEST',
      data_model_id: 508557480951911, // TODO: change this
      claim: claim,
      acl: [
        {
          address: ADMIN_ADDRESS,
          roles: [AccessLevel.VIEW, AccessLevel.SHARE], 
        },
      ],
    });
    console.log('\nData Asset created with ID:', id);
  } catch (error) {
    console.log(error); // Can log it for degugging
  }
}

createModel()