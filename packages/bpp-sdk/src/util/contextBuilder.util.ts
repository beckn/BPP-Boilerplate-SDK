import { BppSDK } from '..'

export const contextBuilder = async (
  {
    transactionId,
    messageId,
    action,
    targetId,
    targetUri
  }: {
    transactionId: string
    messageId: string
    action: string
    targetId: string
    targetUri: string
  },
  sdk: BppSDK
) => {
  let context = {}
  const config = sdk.options

  context = {
    domain: config.domain,
    action,
    bpp_id: config.app?.id,
    bpp_uri: config.app?.uri,
    bap_id: targetId,
    bap_uri: targetUri,
    timestamp: new Date(),
    ttl: config.app?.ttl,
    version: config.version,
    country: config.app?.country,
    city: config.app?.city,
    message_id: messageId,
    transaction_id: transactionId
  }

  const filteredContext = Object.fromEntries(Object.entries(context).filter(entry => entry[1] !== undefined))
  return filteredContext
}
