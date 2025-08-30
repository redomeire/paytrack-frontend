import type AuthRepository from '~~/lib/domain/repository/authRepository'
import { Login } from '../../lib/domain/usecase/auth/login'
import { Register } from '../../lib/domain/usecase/auth/register'
import { ForgotPassword } from '../../lib/domain/usecase/auth/forgotPassword'
import { ResetPassword } from '../../lib/domain/usecase/auth/resetPassword'
import { Logout } from '../../lib/domain/usecase/auth/logout'
import { AuthorizeSocialLogin } from '../../lib/domain/usecase/auth/authorizeSocialLogin'
import { ChangePassword } from '../../lib/domain/usecase/auth/changePassword'
import type BillRepository from '~~/lib/domain/repository/billRepository'
import { GetUpcomingBills } from '../../lib/domain/usecase/bill/getUpcomingBills'
import { GetBillDetail } from '../../lib/domain/usecase/bill/getBillDetail'
import { UpdateBill } from '../../lib/domain/usecase/bill/updateBill'
import { DeleteBill } from '../../lib/domain/usecase/bill/deleteBill'
import { CreateBill } from '../../lib/domain/usecase/bill/createBill'
import { CreateBillCategory } from '../../lib/domain/usecase/bill/createBillCategory'
import { GetAllBillCategories } from '../../lib/domain/usecase/bill/getAllBillCategories'
import { GetRecurringBills } from '../../lib/domain/usecase/bill/getRecurringBills'
import { GetBillSeriesDetail } from '../../lib/domain/usecase/bill/getBillSeriesDetail'
import { CreateBillSeries } from '../../lib/domain/usecase/bill/createBillSeries'
import { UpdateBillSeries } from '../../lib/domain/usecase/bill/updateBillSeries'
import { DeleteBillSeries } from '../../lib/domain/usecase/bill/deleteBillSeries'
import { CheckoutBill } from '../../lib/domain/usecase/bill/checkoutBill'
import type PaymentRepository from '~~/lib/domain/repository/paymentRepository'
import { GetAllPayments } from '../../lib/domain/usecase/payment/getAllPayment'
import { CreatePayment } from '../../lib/domain/usecase/payment/createPayment'
import { GetPaymentDetail } from '../../lib/domain/usecase/payment/getPaymentDetail'
import { UpdatePayment } from '../../lib/domain/usecase/payment/updatePayment'
import { DeletePayment } from '../../lib/domain/usecase/payment/deletePayment'
import type MediaRepository from '~~/lib/domain/repository/mediaRepository'
import { UploadMedia } from '../../lib/domain/usecase/media/uploadMedia'
import type AnalyticsRepository from '~~/lib/domain/repository/analyticsRepository'
import { GetMonthlySpendingTrend } from '../../lib/domain/usecase/analytics/getMonthlySpendingTrend'
import { GetSpendingCountByCategory } from '../../lib/domain/usecase/analytics/getSpendingCountByCategory'

export default defineNuxtPlugin({
  name: 'useCases',
  dependsOn: ['repositories'],
  async setup() {
    const { $repositories } = useNuxtApp()

    // repositories
    const authRepository = $repositories.auth as AuthRepository
    const billRepository = $repositories.bill as BillRepository
    const paymentRepository = $repositories.payment as PaymentRepository
    const mediaRepository = $repositories.media as MediaRepository
    const analyticsRepository = $repositories.analytics as AnalyticsRepository

    // register use cases
    const useCases = {
      auth: {
        login: new Login(authRepository),
        register: new Register(authRepository),
        forgotPassword: new ForgotPassword(authRepository),
        resetPassword: new ResetPassword(authRepository),
        logout: new Logout(authRepository),
        authorizeSocialLogin: new AuthorizeSocialLogin(authRepository),
        changePassword: new ChangePassword(authRepository)
      },
      bill: {
        getRecurringBills: new GetRecurringBills(billRepository),
        getBillSeriesDetail: new GetBillSeriesDetail(billRepository),
        createBillSeries: new CreateBillSeries(billRepository),
        updateBillSeries: new UpdateBillSeries(billRepository),
        deleteBillSeries: new DeleteBillSeries(billRepository),
        getUpcomingBills: new GetUpcomingBills(billRepository),
        getBillDetail: new GetBillDetail(billRepository),
        createBill: new CreateBill(billRepository),
        updateBill: new UpdateBill(billRepository),
        deleteBill: new DeleteBill(billRepository),
        createBillCategory: new CreateBillCategory(billRepository),
        getAllBillCategories: new GetAllBillCategories(billRepository),
        checkoutBill: new CheckoutBill(billRepository)
      },
      payment: {
        getAllPayments: new GetAllPayments(paymentRepository),
        createPayment: new CreatePayment(paymentRepository),
        getPaymentDetail: new GetPaymentDetail(paymentRepository),
        updatePayment: new UpdatePayment(paymentRepository),
        deletePayment: new DeletePayment(paymentRepository)
      },
      media: {
        uploadMedia: new UploadMedia(mediaRepository)
      },
      analytics: {
        getMonthlySpendingTrend: new GetMonthlySpendingTrend(analyticsRepository),
        getSpendingCountByCategory: new GetSpendingCountByCategory(analyticsRepository)
      }
    }

    return {
      provide: {
        useCases
      }
    }
  }
})
