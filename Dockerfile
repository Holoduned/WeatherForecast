FROM php:8.1-fpm

# Установка необходимых расширений и зависимостей
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpq-dev \
    && docker-php-ext-install intl pdo pdo_pgsql

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Копирование файлов приложения
COPY . /var/www/html

# Установка зависимостей приложения
WORKDIR /var/www/html
RUN composer install --no-scripts --no-autoloader

# Оптимизация автозагрузчика
RUN composer dump-autoload --optimize

EXPOSE 9000
CMD ["php-fpm"]
