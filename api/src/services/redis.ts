import Redis from 'ioredis';
import { getStringEnv } from 'env-guard';

const redis = new Redis(getStringEnv('REDIS_URL'));

async function mhgetall(keys: string[]) {
  const pipeline = redis.pipeline();
  keys.forEach(key => {
    pipeline.hgetall(key);
  });
  const data = await pipeline.exec();
  return data.map(d => d[1]);
}

function mhmset(data: [key: string, datum: {}][], exp?: number) {
  const pipeline = redis.pipeline();
  data.forEach(item => {
    pipeline.hmset(item[0], item[1]);
    exp && pipeline.expire(item[0], exp);
  });
  return pipeline.exec();
}

export default redis;
export { mhgetall, mhmset };
