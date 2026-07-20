import { Howl } from "howler";

import clickSfx from "../assets/sounds/click.mp3";
import petirSfx from "../assets/sounds/petir.mp3";
import winSfx from "../assets/sounds/win.mp3";
import gameMusicSrc from "../assets/sounds/game.mp3";
import bgMusicSrc from "../assets/sounds/home-bg-sound.mp3";

export const sounds = {
  click: new Howl({
    src: [clickSfx],
    volume: 0.8,
  }),

  petir: new Howl({
    src: [petirSfx],
    volume: 1.0,
  }),

  win: new Howl({
    src: [winSfx],
    volume: 1.0,
  }),

  gameMusic: new Howl({
    src: [gameMusicSrc],
    loop: true,
    volume: 1.0,
  }),

  bgMusic: new Howl({
    src: [bgMusicSrc],
    loop: true,
    volume: 0.4,
  }),
};

// =========================
// HOME MUSIC
// =========================

export const startHomeMusic = () => {
  if (!sounds.bgMusic.playing()) {
    sounds.bgMusic.play();
  }
};

export const stopHomeMusic = () => {
  sounds.bgMusic.stop();
};

// =========================
// GAME MUSIC
// =========================

export const startGameMusic = () => {
  if (!sounds.gameMusic.playing()) {
    sounds.gameMusic.play();
  }
};

export const stopGameMusic = () => {
  sounds.gameMusic.stop();
};

// =========================
// SFX
// =========================

export const playPetir = () => {
  sounds.petir.stop();
  sounds.petir.play();
};

export const playWin = () => {
  sounds.win.stop();
  sounds.win.play();
};

export const playClick = () => {
  sounds.click.stop();
  sounds.click.play();
};