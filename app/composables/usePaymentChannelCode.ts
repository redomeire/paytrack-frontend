import channel from '~/assets/payment-channel/channel.json'

export const usePaymentChannelCode = () => {
  const mappedChannel = channel.map((item) => ({
    label: item.name,
    value: item.channelCode
  }))
  return useState('paymentChannelCode', () => ({
    channel: mappedChannel
  }))
}
