import { createClient } from "https://denopkg.com/chiefbiiko/dynamodb/mod.ts";
import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";

// if config/credentials not passed they will be read from the env/fs
const dyno = createClient();

const TABLE_NAME = "poc-ecomm-click-events";

const putEvent = (item: any, tableName = TABLE_NAME) => {
  console.log(item);
  dyno
    .putItem({
      Item: {
        ...item,
        createdOn: new Date().toISOString(),
        id: faker.random.uuid(),
        clickCount: 1,
        price: 0.8,
        rateType: 1,
      },
      TableName: tableName,
    })
    .then((data: any) => console.log(data))
    .catch(console.error);
};

const generateItem = () => ({
  accountId: faker.random.uuid(),
  campaignId: faker.random.uuid(),
  jobId: faker.random.uuid(),
  tenantId: "528f38e8-f3b0-4904-aa1b-d8fe3ffb8acc",
  exchangeRateToUSD: faker.random.number(),
});

const generateItems = (number: any) => {
  const items = Array(number).fill(0);

  return items.map((_) => {
    const i = generateItem();

    return i;
  });
};

const start = async (itemNumber = 10) => {
  const items = generateItems(itemNumber);

  while (true) {
    for (let i in items) {
      await sleep(1000);
      await putEvent(items[i]);
    }
  }
};

async function sleep(millis: any) {
  return new Promise((resolve: any) => setTimeout(resolve, millis));
}

start();