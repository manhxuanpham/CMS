using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VNPAY.NET.Models;
using VNPAY.NET.Utilities;
using VNPAY.NET;
using Microsoft.Extensions.Options;
using CMS.Core.Models.Payment;
using CMS.Core.Repository;
namespace CMS.Api.Controllers.AdminApi
{
    [Route("api/Vnpay")]
    [ApiController]
    public class VnpayController : ControllerBase
    {
        private readonly IVnpay _vnpay;
        private readonly VnpaySettings _vnpaySettings;
        private readonly ITransactionRepository _transactionRepository;
        public VnpayController( IOptions<VnpaySettings> vnpaySetting,IVnpay vnpayService, ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
            _vnpaySettings = vnpaySetting.Value;

            _vnpay = vnpayService;
            _vnpay.Initialize(
                _vnpaySettings.TmnCode,
                _vnpaySettings.HashSecret,
                _vnpaySettings.BaseUrl,
                _vnpaySettings.CallbackUrl
            );
        }
        [HttpGet("CreatePaymentUrl")]
        public ActionResult<string> CreatePaymentUrl(double moneyToPay, string description)
        {
            if (moneyToPay <= 0)
            {
                return BadRequest("Số tiền phải lớn hơn 0.");
            }

            var ipAddress = NetworkHelper.GetIpAddress(HttpContext); // Lấy địa chỉ IP của thiết bị thực hiện giao dịch

            var request = new PaymentRequest
            {
                
                PaymentId = DateTime.Now.Ticks,
                Money = moneyToPay,
                Description = description,
                IpAddress = ipAddress
            };

            var paymentUrl = _vnpay.GetPaymentUrl(request);
            _transactionRepository.Add(new Core.Domain.Royalty.Transaction
            {
                Amount = moneyToPay,
                Note = $"Tạo thanh toán thành công",
                TransactionType = Core.Domain.Royalty.TransactionType.RoyaltyPay,
            });
            return Created(paymentUrl, paymentUrl);
        }

        [HttpGet("Callback")]
        public ActionResult<PaymentResult> CallbackAction()
        {
            if (Request.QueryString.HasValue)
            {
                var paymentResult = _vnpay.GetPaymentResult(Request.Query);
                if (paymentResult.IsSuccess)
                {
                  
                    // Thực hiện hành động nếu thanh toán thành công tại đây. Ví dụ: Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu.
                    return Ok(paymentResult);
                }

                // Thực hiện hành động nếu thanh toán thất bại tại đây. Ví dụ: Thông báo thanh toán thất bại cho người dùng.
                return BadRequest(paymentResult);
            }

            return NotFound();
        }
    }
}
