import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from './badge/badge.entity';

const BADGES = [
  {
    id: 1,
    slug: 'cda',
    name: 'Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
  },
  {
    id: 2,
    slug: 'cda-valley',
    name: 'Cidade Alta Valley',
    image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
  },
  {
    id: 3,
    slug: 'policia',
    name: 'Policia do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/policia.png',
  },
  {
    id: 4,
    slug: 'hospital',
    name: 'Hospital do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/hospital.png',
  },
  {
    id: 5,
    slug: 'mecanica',
    name: 'Mecânica do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/mecanica.png',
  },
  {
    id: 6,
    slug: 'taxi',
    name: 'Taxi do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/taxi.png',
  },
  {
    id: 7,
    slug: 'curuja',
    name: 'Coruja',
    image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
  },
  {
    id: 8,
    slug: 'hiena',
    name: 'Hiena',
    image: 'https://cidadealtarp.com/imagens/challenge/hiena.png',
  },
  {
    id: 9,
    slug: 'gato',
    name: 'Gato',
    image: 'https://cidadealtarp.com/imagens/challenge/gato.png',
  },
  {
    id: 10,
    slug: 'urso',
    name: 'Urso',
    image: 'https://cidadealtarp.com/imagens/challenge/urso.png',
  },
];

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
  ) {}

  async onModuleInit() {
    const count = await this.badgeRepository.count();
    if (count === 0) {
      await this.badgeRepository.save(BADGES);
    }
  }
}
