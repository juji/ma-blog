
import { graphql } from "@octokit/graphql"
import { CreateDiscussionPayload } from "@octokit/graphql-schema"

const CLIENT_MUTATION = 'juji-blog'

export async function create({ 
  pathname,
} : {
  pathname: string
}){

  const { 
    createDiscussion 
  } : { 
    createDiscussion: CreateDiscussionPayload 
  } = await graphql(
    `mutation CreateDiscussion($input: CreateDiscussionInput!) {
      createDiscussion(input: $input) {
        discussion {
          id
        }
      }
    }`,
    {
      input: {
        repositoryId: process.env.NEXT_PUBLIC_GITHUB_REPO_ID,
        categoryId: process.env.NEXT_PUBLIC_GITHUB_CATEGORY_ID,
        body: `Discussion for ${pathname}`,
        title: pathname,
        clientMutationId: CLIENT_MUTATION
      },
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }
    }
  )

  return createDiscussion.discussion

}

export async function del( id: string ){

  const response = await graphql(
    `mutation DeleteDiscussion($input: DeleteDiscussionInput!) {
      deleteDiscussion(input: $input) {
        discussion {
          id
        }
      }
    }`,
    {
      input: {
        id,
        clientMutationId: CLIENT_MUTATION
      },
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }
    }
  )

  // console.log(response)
  return}