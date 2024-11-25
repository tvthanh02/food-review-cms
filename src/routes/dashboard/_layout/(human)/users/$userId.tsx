import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/_layout/(human)/users/$userId'
)({
  component: UserDetailPage,
});

function UserDetailPage() {
  return (
    <div className='w-full flex flex-col gap-5'>
      <section className='cus-container'>
        <div className='w-full h-fit flex flex-col gap-3'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
              <h2 className='text-2xl font-bold'>General Infomation</h2>
              <span className='text-sm'>Detail infomation of Sub Admin</span>
            </div>
            <div className='flex items-center gap-2'>
              <Avatar className='w-12 h-12'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>TV</AvatarFallback>
              </Avatar>
              <p>Trieu Thanh </p>
            </div>
          </div>
          <Separator />
        </div>
      </section>
      <section className='cus-container'>
        <div className='w-full h-fit flex flex-col gap-3'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
              <h2 className='text-2xl font-bold'>Social Media</h2>
              <span className='text-sm'>Social links of Sub Admin</span>
            </div>
            <div className='cus-container text-sm'>
              <p>Liên kết mạng xã hội:</p>
              <p>Facebook: facebook.com/username</p>{' '}
              <p>Instagram: instagram.com/username</p>
              <p>YouTube: youtube.com/username</p>{' '}
              <p>TikTok: tiktok.com/@username</p>
            </div>
          </div>
        </div>
      </section>
      <section className='cus-container'>
        <div className='w-full h-fit flex flex-col gap-5'>
          <div className='w-full h-fit flex justify-between items-start'>
            <div className='flex flex-col gap-1'>
              <h2 className='text-2xl font-bold'>Sub Admin Post</h2>
              <span className='text-sm'>Review posts of sub admin</span>
            </div>
            <Button>More</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
