from django.utils.deprecation import MiddlewareMixin
import threading


class ShareData(MiddlewareMixin):
    _threadmap = {}

    @classmethod
    def get_current_request(cls):
        return cls._threadmap[threading.get_ident()]

    def process_request(self, request):
        """
        threading 별 고유 번호를 통해 request를 어디서든 가져올 수 있게 지원합니다.
        """
        self._threadmap[threading.get_ident()] = request

        return None

    def process_exception(self, request, exception):
        try:
            del self._threadmap[threading.get_ident()]
        except KeyError:
            pass

    def process_response(self, request, response):
        try:
            del self._threadmap[threading.get_ident()]
        except KeyError:
            pass
        return response
