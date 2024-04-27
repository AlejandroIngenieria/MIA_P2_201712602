# MIA | Proyecto 2
## Implementacion en la nube AWS
wget https://dl.google.com/go/go1.21.0.linux-amd64.tar.gz
sudo cp go1.21.0.linux-amd64.tar.gz /usr/local
cd ~ && cd /usr/local
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz

nano ~/.bashrc
export PATH=$PATH:/usr/local/go/bin
source ~/.bashrc
