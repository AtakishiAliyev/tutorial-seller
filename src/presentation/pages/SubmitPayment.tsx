import useCompletePurchase from '@business/services/course/useCompletePurchase.ts';
import { Dialog, Transition } from '@headlessui/react';
import { AlertTriangle, Loader2, ShieldCheck } from 'lucide-react';
import { Fragment, memo, useEffect, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SubmitPayment = () => {
  const [urlSearchParams] = useSearchParams();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const accessId = urlSearchParams.get('accessId') || '';
  const paymentId = urlSearchParams.get('paymentId') || '';

  const { error, completePurchase } = useCompletePurchase({
    showErrorNotification: true,
    accessId,
    paymentId,
  });

  useLayoutEffect(() => {
    if (accessId && paymentId) {
      completePurchase();
    }
  }, [accessId, completePurchase, paymentId]);

  useEffect(() => {
    if (error) {
      setIsErrorModalOpen(true);
    }
  }, [error]);

  if (!accessId || !paymentId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 dark:bg-red-900/10 p-4">
        <div className="flex items-center space-x-3 rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
          <AlertTriangle className="h-10 w-10 text-red-500" />
          <div>
            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              Parametr xətası
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Ödənişi təsdiqləmək üçün keçid etibarsızdır.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 dark:bg-slate-900">
        <div className="w-full max-w-md transform space-y-6 rounded-2xl bg-white p-8 text-center shadow-xl transition-all dark:bg-slate-800">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ödəniş yoxlanılır</h1>

          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">Yoxlanılır...</p>
          </div>

          <p className="text-slate-600 dark:text-slate-400">
            Ödəniş məlumatlarınızı yoxlayarkən zəhmət olmasa gözləyin. Siz avtomatik olaraq
            yönləndiriləcəksiniz.
          </p>

          <div className="flex items-center justify-center pt-4 text-sm text-slate-500 dark:text-slate-400">
            <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
            <span>Təhlükəsiz əməliyyat</span>
          </div>
        </div>
      </div>

      <Transition appear show={isErrorModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsErrorModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          {/* Modal content */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-800">
                  <div className="flex items-center">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
                      <AlertTriangle
                        className="h-6 w-6 text-red-600 dark:text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-4">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-slate-900 dark:text-slate-100"
                      >
                        Ödəniş emalı zamanı xəta
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-4 pl-0 sm:pl-14">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {error?.length > 0 ||
                        'Naməlum xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin və ya dəstək xidməti ilə əlaqə saxlayın.'}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:bg-red-900/50 dark:text-red-200 dark:hover:bg-red-900 dark:focus-visible:ring-offset-slate-800"
                      onClick={() => setIsErrorModalOpen(false)}
                    >
                      Bağlamaq
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const MemoizedSubmitPayment = memo(SubmitPayment);

export default MemoizedSubmitPayment;
