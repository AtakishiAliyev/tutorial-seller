import { showToasts } from '@business/shared/utils/showToasts.ts';
import { useBuyCourseContract } from '@presentation/contracts/course/BuyCourseContract.tsx';
import { useCreateCreditRequestContract } from '@presentation/contracts/credit/CreateCreditRequestContract.tsx';
import Button from '@presentation/shared/ui/Button.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import FormCard from '@presentation/shared/ui/FormCard.tsx';
import { Input } from '@presentation/shared/ui/Input.tsx';
import { cn } from '@presentation/shared/utils/cn.ts';
import { dFunc } from 'd-func';
import { FC, memo, useCallback, useState } from 'react';

type BuyCourseModalProps = {
  isOpen?: boolean;
  meta?: { courseId?: string; courseSlug?: string; courseName?: string };
  onClose?: () => void;
};

const BuyCourseModal: FC<BuyCourseModalProps> = ({ meta, isOpen = false, onClose = dFunc }) => {
  const { buyCourse, loading } = useBuyCourseContract();
  const [mode, setMode] = useState<'cash' | 'credit'>('cash');

  const {
    doesUserAlreadyRequestedError,
    doesUserAlreadyRequested,
    doesUserAlreadyRequestedLoading,
    createCreditRequestLoading,
    createCreditRequestError,
    createCreditRequest,
    form,
    isSuccess,
  } = useCreateCreditRequestContract();

  console.log('IsSuccess', isSuccess);

  const {
    register,
    formState: { errors },
  } = form;

  const handleBuyCourse = useCallback(async () => {
    if (meta?.courseSlug) {
      await buyCourse(meta.courseSlug);
    } else {
      showToasts('No course slug', 'error');
    }
  }, [buyCourse, meta?.courseSlug]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={cn(
          'bg-white rounded-2xl shadow-xl w-[100%] max-w-xl mx-auto transform transition-all duration-300',
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-5',
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Kurs Alışı</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          {/* Mode switch */}
          <div className="flex justify-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMode('cash')}
              className={cn(
                'flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200',
                mode === 'cash'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-200',
              )}
            >
              Nağd alış
            </button>
            <button
              onClick={() => setMode('credit')}
              className={cn(
                'flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200',
                mode === 'credit'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-200',
              )}
            >
              Kredit ilə
            </button>
          </div>

          {/* Cash purchase */}
          {mode === 'cash' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-gray-600 text-sm">
                Kursu dərhal əldə etmək üçün aşağıdakı düyməni sıxın.
              </p>
              <Button
                onClick={handleBuyCourse}
                variant="primary"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Yüklənir...' : 'Kursu indi al'}
              </Button>
            </div>
          )}

          {/* Credit purchase */}
          {mode === 'credit' && (
            <div className="text-gray-700">
              {doesUserAlreadyRequestedLoading ? (
                <p className="text-center text-gray-500 text-sm">Yüklənir...</p>
              ) : doesUserAlreadyRequested ? (
                <p className="text-center text-gray-600 text-sm">
                  Siz artıq kredit üçün müraciət etmisiniz. Zəhmət olmasa, sizinlə əlaqə
                  saxlanılmasını gözləyin.
                </p>
              ) : isSuccess ? (
                <p className="text-center text-green-600 text-sm font-medium">
                  Müraciət uğurla göndərildi! Zəhmət olmasa, sizinlə əlaqə saxlanılmasını gözləyin.
                </p>
              ) : (
                <FormCard title="Kredit müraciəti" subtitle="Aşağıdakı məlumatları doldurun">
                  <ErrorBox messages={createCreditRequestError || doesUserAlreadyRequestedError} />
                  <form onSubmit={createCreditRequest} className="space-y-6">
                    {/* FIN */}
                    <Input.Group id="fin" variant={errors.fin ? 'error' : 'default'}>
                      <Input.Label>FIN kod</Input.Label>
                      <Input type="text" placeholder="Məsələn: ABC1234" {...register('fin')} />
                      {errors.fin && (
                        <Input.ErrorMessage>{errors.fin.message as string}</Input.ErrorMessage>
                      )}
                    </Input.Group>

                    {/* Phone */}
                    <Input.Group id="phone" variant={errors.phone ? 'error' : 'default'}>
                      <Input.Label>Mobil nömrə</Input.Label>
                      <Input type="text" placeholder="505555555" {...register('phone')} />
                      {errors.phone && (
                        <Input.ErrorMessage>{errors.phone.message as string}</Input.ErrorMessage>
                      )}
                    </Input.Group>

                    {/* Birth Date */}
                    <Input.Group id="birthDate" variant={errors.birthDate ? 'error' : 'default'}>
                      <Input.Label>Doğum tarixi</Input.Label>
                      <Input
                        type="date"
                        {...register('birthDate', {
                          valueAsDate: true,
                        })}
                      />
                      {errors.birthDate && (
                        <Input.ErrorMessage>
                          {errors.birthDate.message as string}
                        </Input.ErrorMessage>
                      )}
                    </Input.Group>

                    <Button
                      htmlType="submit"
                      variant="primary"
                      className="w-full"
                      disabled={createCreditRequestLoading}
                    >
                      {createCreditRequestLoading ? 'Göndərilir...' : 'Müraciəti göndər'}
                    </Button>
                  </form>
                </FormCard>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MemoizedBuyCourseModal = memo(BuyCourseModal);
export { MemoizedBuyCourseModal as BuyCourseModal };
