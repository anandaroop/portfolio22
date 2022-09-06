# Digital Ocean new server

## Apache sites and subdomains

```sh
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
sudo systemctl stop apache2
sudo systemctl start apache2


hostname -I

sudo mkdir /var/www/anandarooproy.com
sudo chown -R $USER:$USER /var/www/anandarooproy.com
find /var/www/anandarooproy.com -ls
touch /var/www/anandarooproy.com/index.html
vi /var/www/anandarooproy.com/index.html

sudo a2enmod rewrite
sudo systemctl restart apache2

sudo vi /etc/apache2/sites-available/001-anandarooproy.com.conf
sudo a2ensite 001-anandarooproy.com.conf
sudo apache2ctl configtest
sudo systemctl restart apache2

sudo vi sites-available/002-styles.conf
sudo a2ensite 002-styles.conf
sudo apache2ctl configtest
sudo systemctl restart apache2

sudo vi sites-available/003-moved.conf
sudo a2ensite 003-moved.conf
sudo apache2ctl configtest
sudo systemctl restart apache2

sudo vi sites-available/004-squidgy.conf
sudo a2ensite 004-squidgy.conf
sudo apache2ctl configtest
sudo systemctl restart apache2
```

## Let's Encrypt

https://letsencrypt.org/getting-started/

https://certbot.eff.org/instructions?ws=apache&os=ubuntufocal

```
uname -a
cat /etc/os-release
sudo snap install core; sudo snap refresh core
sudo apt-get remove certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --apache
sudo certbot renew --dry-run
```
