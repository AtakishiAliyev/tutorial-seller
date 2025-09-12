import { GetOwnedCoursesResponseDto } from '@infra/dto/course/GetOwnedCoursesResponseDto.ts';
import Button from '@presentation/shared/ui/Button';
import { Calendar, CheckCircle, Hourglass, XCircle } from 'lucide-react';
import { FC, memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type CourseCardProps = {
  course: GetOwnedCoursesResponseDto;
  footerSlot?: ReactNode;
};

const PaymentStatusBadge: FC<{ payment: GetOwnedCoursesResponseDto['submittedPayment'] }> = ({
  payment,
}) => {
  if (!payment) {
    return null;
  }

  if (payment.status === 'APPROVED') {
    return (
      <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
        <CheckCircle className="mr-1.5 h-4 w-4" />
        Ödənilib
      </div>
    );
  }

  if (payment.status === 'CREATED') {
    return (
      <div className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
        <Hourglass className="mr-1.5 h-4 w-4" />
        Gözləmədədir
      </div>
    );
  }

  return (
    <div className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
      <XCircle className="mr-1.5 h-4 w-4" />
      Xəta baş verdi
    </div>
  );
};

const ProfileCourseCard: FC<CourseCardProps> = ({ course, footerSlot }) => {
  const payment = course.submittedPayment;
  const displayAmount = payment ? payment.amount : course.salePrice;
  const isApproved = payment?.status === 'APPROVED';

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg sm:flex-row">
      <div className="relative h-48 w-full overflow-hidden sm:h-auto sm:w-48 sm:self-stretch">
        <img
          className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
          src={course.preview}
          alt={course.title}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-2 flex-shrink-0" />
          <span>
            Alınma tarixi:{' '}
            {new Date(course.userPurchases[0].purchaseDate).toLocaleDateString('az-AZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        <div className="mt-4 flex flex-grow items-center justify-between">
          <p className="text-xl font-bold text-gray-900">{displayAmount.toFixed(2)} AZN</p>
          <PaymentStatusBadge payment={payment} />
        </div>

        {isApproved && (
          <div className="mt-4">
            <Link to={`/courses/watch/${course.slug}`}>
              <Button className="w-full md:max-w-[200px] mr-auto">Kursa Keçid</Button>
            </Link>
          </div>
        )}

        {footerSlot && <div className="mt-4">{footerSlot}</div>}
      </div>
    </div>
  );
};

const MemoizedProfileCourseCard = memo(ProfileCourseCard);

export default MemoizedProfileCourseCard;
