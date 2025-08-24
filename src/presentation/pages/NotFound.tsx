import Link from '@presentation/shared/ui/Link.tsx';
import Typography from '@presentation/shared/ui/Typography';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-lg w-full">
        <div className="text-center flex flex-col items-center">
          <Typography weight="semibold" color="primary" className="text-6xl">
            404
          </Typography>

          <Typography color="secondary" className="text-3xl">
            Səhifə tapılmadı
          </Typography>

          <Typography color="muted" className="mt-4">
            Təəssüf ki, axtardığınız səhifəni tapa bilmədik. Ola bilsin ki, ünvanı səhv yazmısınız
            və ya səhifə köçürülüb.
          </Typography>
        </div>

        {/*  Link to go home  */}
        <Link to="/" className="block mt-4 text-xl text-center" variant="primary">
          Əsas səhifəyə qayıt
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
