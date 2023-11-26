import Swal from 'sweetalert2';

export const errorsHandling = (error: any) => {
  if (Array.isArray(error.error.message)) {
    error.error.message.forEach((msg: string) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: msg,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: error.error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
