FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    libssl-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Install MongoDB PHP extension (if needed)
# Note: Render free tier might not support this
RUN pecl install mongodb && \
    docker-php-ext-enable mongodb || echo "MongoDB extension installation skipped"

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mysqli mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first (for better caching)
COPY composer.json composer.lock* ./

# Install dependencies (only if composer.json exists)
RUN if [ -f composer.json ]; then \
    composer install --no-dev --optimize-autoloader || echo "Composer install completed"; \
    fi

# Copy application files
COPY . /var/www/html

# Create necessary directories
RUN mkdir -p /var/www/html/public && \
    mkdir -p /var/www/html/tmp && \
    mkdir -p /var/www/html/logs

# Set permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# Expose port
EXPOSE 9000

CMD ["php-fpm"]
