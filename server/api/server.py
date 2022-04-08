from aiohttp import web
import aiohttp_cors

import socketio

sio = socketio.AsyncServer(serializer='msgpack',cors_allowed_origins='*', logger=True,  engineio_logger=True)
app = web.Application()
sio.attach(app)

async def index(request):
    """Serve the client-side application."""
    return web.Response(text="<html>Hellow</html>", content_type='text/html')

@sio.event
def connect(sid, _environ, _msgpack_type):
    print("connect", str(sid))

@sio.event
async def hello(sid):
    print("hello")
    await sio.emit('drawTexture', [1,2,3])

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

# app.router.add_get('/', index)

# Configure default CORS settings.
cors = aiohttp_cors.setup(app, defaults={
    "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
})

if __name__ == '__main__':
    web.run_app(app)