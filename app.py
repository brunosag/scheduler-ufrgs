from . import create_app
import os

app = create_app()

if __name__ == "__main__":
    app.run(debug="FLY_APP_NAME" not in os.environ)
