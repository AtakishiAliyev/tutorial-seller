import useResendConfirmEmail, {
  UseResendConfirmEmailProps,
} from '@business/services/auth/useResendConfirmEmail.ts';
import Button from '@presentation/shared/ui/Button.tsx';
import { dFunc } from 'd-func.ts';
import { memo, useEffect, useRef, useState } from 'react';

type ResendConfirmationEmailProps = UseResendConfirmEmailProps;

const ResendConfirmationEmail = ({
  showErrorNotification = false,
  showSuccessNotification = true,
  afterSuccess = dFunc,
  afterError = dFunc,
  providedEmail,
}: ResendConfirmationEmailProps) => {
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { resendConfirmEmail, loading } = useResendConfirmEmail({
    showErrorNotification,
    showSuccessNotification,
    afterSuccess,
    afterError,
    providedEmail,
  });

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleResend = async () => {
    await resendConfirmEmail();
    setCooldown(120);

    timerRef.current = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        variant="outline"
        className="disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleResend}
        htmlType="button"
        disabled={loading || cooldown > 0}
      >
        {loading
          ? 'Sending...'
          : cooldown > 0
            ? `Resend code in ${cooldown}s`
            : 'Resend confirmation code'}
      </Button>
    </div>
  );
};

const MemoizedResendConfirmationEmail = memo(ResendConfirmationEmail);

export default MemoizedResendConfirmationEmail;
