using FakeItEasy;
using CMS.Core.Domain.Content;
namespace TestProject_CMS
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            System.Threading.Thread.Sleep(5000); // Delay 5 giây

            // make some fakes for the test
            var Post = A.Fake<Post>();
            Console.WriteLine("post",Post);
            var shop = A.Fake<PostCategory>();
            if (!System.Diagnostics.Debugger.IsAttached)
            {
                System.Diagnostics.Debugger.Launch();
            }
            // Your test logic here
            Assert.True(true);

        }
    }
}