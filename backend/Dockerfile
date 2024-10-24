FROM python:3.11-alpine

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . .

RUN pip3 install -r requirements.txt
RUN mkdir -p /usr/share/files

CMD ["/bin/bash"]