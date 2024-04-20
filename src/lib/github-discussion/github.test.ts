
import { expect, test } from 'vitest'
import { create, del } from './index'

test('creating discussion', async () => {

  // console.log('process.env.GITHUB_TOKEN', process.env.GITHUB_TOKEN);

  const discussion = await create({
    pathname: 'asdf/asdf/asdf'
  })

  // console.log('discussion', discussion);
  expect(discussion?.id).toBeTruthy();

  await del(discussion?.id as string)

});