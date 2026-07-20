import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sounds } from "../../data/sounds";
import { getUserItem, setUserItem, removeUserItem } from "../utils/userStorage";
import lottie from "lottie-web";
import petirAnim from "../../assets/animations/petir.json";
import winAnim from "../../assets/animations/win.json";

// ── LottieAnim ────────────────────────────────────────────────────────────────
function LottieAnim({ animationData, loop = false, style = {}, onComplete }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const anim = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop,
      autoplay: true,
      animationData,
    });
    if (onComplete) anim.addEventListener("complete", onComplete);
    return () => anim.destroy();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <div ref={ref} style={{ background: "transparent", ...style }} />;
}

// ── LottiePreloaded ───────────────────────────────────────────────────────────
function LottiePreloaded({ animationData, animRef, style = {} }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData,
    });
    animRef.current = anim;
    return () => { anim.destroy(); animRef.current = null; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <div ref={containerRef} style={{ background: "transparent", ...style }} />;
}

import imgCPU        from "../../assets/puzzle/hardware/CPU.png";
import imgHeadset    from "../../assets/puzzle/hardware/Headset.png";
import imgKeyboard   from "../../assets/puzzle/hardware/keyboard.png";
import imgMicrophone from "../../assets/puzzle/hardware/Microphone.png";
import imgModem      from "../../assets/puzzle/hardware/Modem.png";
import imgMonitor    from "../../assets/puzzle/hardware/Monitor.png";
import imgMouse      from "../../assets/puzzle/hardware/mouse.png";
import imgPrinter    from "../../assets/puzzle/hardware/Printer.png";
import imgProyektor  from "../../assets/puzzle/hardware/Proyektor.png";
import imgSpeaker    from "../../assets/puzzle/hardware/Speaker.png";

const HARDWARE_LIST = [
  {
    img: imgCPU,
    nama: "CPU",
    kategori: "Hardware",
    deskripsi:
      "CPU (Central Processing Unit) adalah otak dari komputer yang bertanggung jawab memproses semua instruksi dan data yang diberikan oleh program.",
    fakta: [
      "Disebut juga prosesor atau otak komputer",
      "Kecepatan diukur dalam GHz (Gigahertz)",
      "Terdiri dari ALU, CU, dan Register",
    ],
    soal: [
      {
        q: "CPU merupakan singkatan dari...",
        opts: [
          "Central Power Unit",
          "Central Processing Unit",
          "Computer Processing Unit",
          "Central Program Unit",
        ],
        ans: 1,
      },
      {
        q: "CPU sering disebut sebagai ... dari komputer.",
        opts: ["Jantung", "Otak", "Memori", "Tulang punggung"],
        ans: 1,
      },
      {
        q: "Kecepatan CPU diukur dalam satuan...",
        opts: ["Megabyte", "Gigabyte", "GHz (Gigahertz)", "Terabyte"],
        ans: 2,
      },
      {
        q: "Komponen yang TIDAK termasuk bagian dalam CPU adalah...",
        opts: ["ALU", "Control Unit", "Register", "Hard Disk"],
        ans: 3,
      },
      {
        q: "ALU pada CPU berfungsi untuk...",
        opts: [
          "Menyimpan data permanen",
          "Menampilkan gambar ke monitor",
          "Melakukan operasi aritmatika dan logika",
          "Mengatur lalu lintas data jaringan",
        ],
        ans: 2,
      },
    ],
  },
  {
    img: imgHeadset,
    nama: "Headset",
    kategori: "Hardware",
    deskripsi:
      "Headset adalah perangkat keras yang menggabungkan headphone (speaker telinga) dan mikrofon dalam satu unit, digunakan untuk mendengarkan audio sekaligus berbicara.",
    fakta: [
      "Termasuk perangkat input dan output sekaligus",
      "Digunakan untuk gaming, meeting online, dan musik",
      "Tersedia dalam versi kabel dan nirkabel (Bluetooth)",
    ],
    soal: [
      {
        q: "Headset termasuk dalam kategori perangkat...",
        opts: [
          "Input saja",
          "Output saja",
          "Input dan output sekaligus",
          "Penyimpanan",
        ],
        ans: 2,
      },
      {
        q: "Bagian dari headset yang berfungsi sebagai input suara adalah...",
        opts: ["Speaker", "Mikrofon", "Kabel USB", "Bantalan telinga"],
        ans: 1,
      },
      {
        q: "Headset nirkabel menggunakan teknologi...",
        opts: ["Inframerah", "Wi-Fi", "Bluetooth", "Ethernet"],
        ans: 2,
      },
      {
        q: "Salah satu kegunaan headset adalah...",
        opts: [
          "Mencetak dokumen",
          "Menyimpan file",
          "Menampilkan gambar",
          "Melakukan panggilan video online",
        ],
        ans: 3,
      },
      {
        q: "Perbedaan headset dengan headphone biasa adalah...",
        opts: [
          "Headset tidak bisa memutar musik",
          "Headset dilengkapi mikrofon",
          "Headphone memiliki mikrofon",
          "Tidak ada perbedaan",
        ],
        ans: 1,
      },
    ],
  },
  {
    img: imgKeyboard,
    nama: "Keyboard",
    kategori: "Hardware",
    deskripsi:
      "Keyboard adalah perangkat input utama komputer yang digunakan untuk memasukkan teks, angka, dan perintah ke dalam komputer melalui tombol-tombol yang tersusun.",
    fakta: [
      "Termasuk perangkat input (masukan)",
      "Susunan tombol standar disebut QWERTY",
      "Terdiri dari tombol alfanumerik, fungsi, dan navigasi",
    ],
    soal: [
      {
        q: "Keyboard termasuk dalam perangkat keras jenis...",
        opts: ["Output", "Input", "Storage", "Proses"],
        ans: 1,
      },
      {
        q: "Susunan tombol standar pada keyboard disebut...",
        opts: ["AZERTY", "DVORAK", "QWERTY", "COLEMAK"],
        ans: 2,
      },
      {
        q: "Tombol yang digunakan untuk menghapus karakter sebelum kursor adalah...",
        opts: ["Delete", "Backspace", "Escape", "Enter"],
        ans: 1,
      },
      {
        q: "Tombol fungsi pada keyboard ditandai dengan huruf...",
        opts: ["A hingga Z", "F1 hingga F12", "0 hingga 9", "Ctrl dan Alt"],
        ans: 1,
      },
      {
        q: "Keyboard yang tidak menggunakan kabel disebut keyboard...",
        opts: ["Mekanik", "Membran", "Nirkabel (Wireless)", "Virtual"],
        ans: 2,
      },
    ],
  },
  {
    img: imgMicrophone,
    nama: "Microphone",
    kategori: "Hardware",
    deskripsi:
      "Mikrofon adalah perangkat input yang mengubah gelombang suara menjadi sinyal listrik sehingga suara dapat direkam, dikirim, atau diproses oleh komputer.",
    fakta: [
      "Termasuk perangkat input suara",
      "Mengubah gelombang suara menjadi sinyal digital",
      "Digunakan untuk rekaman, podcast, dan konferensi video",
    ],
    soal: [
      {
        q: "Mikrofon berfungsi untuk...",
        opts: [
          "Mengeluarkan suara dari komputer",
          "Memasukkan suara ke dalam komputer",
          "Menyimpan file audio",
          "Menampilkan gelombang suara",
        ],
        ans: 1,
      },
      {
        q: "Mikrofon termasuk perangkat keras jenis...",
        opts: ["Output", "Storage", "Input", "Proses"],
        ans: 2,
      },
      {
        q: "Mikrofon mengubah gelombang suara menjadi...",
        opts: ["Gelombang cahaya", "Sinyal listrik/digital", "Data teks", "Gambar piksel"],
        ans: 1,
      },
      {
        q: "Salah satu kegunaan mikrofon pada komputer adalah...",
        opts: [
          "Mencetak dokumen",
          "Merekam suara atau podcast",
          "Menyimpan foto",
          "Menampilkan video",
        ],
        ans: 1,
      },
      {
        q: "Mikrofon yang terpasang langsung pada laptop disebut...",
        opts: [
          "Mikrofon eksternal",
          "Mikrofon kondensor",
          "Mikrofon internal (built-in)",
          "Mikrofon dinamis",
        ],
        ans: 2,
      },
    ],
  },
  {
    img: imgModem,
    nama: "Modem",
    kategori: "Hardware",
    deskripsi:
      "Modem (Modulator-Demodulator) adalah perangkat keras yang mengubah sinyal digital dari komputer menjadi sinyal analog untuk dikirim melalui jaringan, dan sebaliknya.",
    fakta: [
      "Singkatan dari Modulator-Demodulator",
      "Menghubungkan komputer ke internet",
      "Tersedia dalam jenis ADSL, kabel, dan seluler",
    ],
    soal: [
      {
        q: "Modem adalah singkatan dari...",
        opts: [
          "Monitor Demodulator",
          "Modulator-Demodulator",
          "Modern Demography",
          "Mode Detector",
        ],
        ans: 1,
      },
      {
        q: "Fungsi utama modem adalah...",
        opts: [
          "Menyimpan data internet",
          "Menghubungkan komputer ke jaringan internet",
          "Mencetak halaman web",
          "Memproses sinyal video",
        ],
        ans: 1,
      },
      {
        q: "Modem mengubah sinyal digital menjadi sinyal analog, proses ini disebut...",
        opts: ["Demodulasi", "Modulasi", "Kompresi", "Enkripsi"],
        ans: 1,
      },
      {
        q: "Jenis modem yang menggunakan jaringan telepon adalah...",
        opts: ["Modem kabel", "Modem seluler", "Modem ADSL", "Modem fiber"],
        ans: 2,
      },
      {
        q: "Kecepatan modem diukur dalam satuan...",
        opts: ["Watt", "Hertz", "bps (bit per second)", "Volt"],
        ans: 2,
      },
    ],
  },
  {
    img: imgMonitor,
    nama: "Monitor",
    kategori: "Hardware",
    deskripsi:
      "Monitor adalah perangkat output utama komputer yang menampilkan informasi visual berupa teks, gambar, dan video hasil pemrosesan komputer.",
    fakta: [
      "Termasuk perangkat output (keluaran)",
      "Resolusi diukur dalam piksel (misal: 1920×1080)",
      "Jenis: LED, LCD, OLED, dan CRT",
    ],
    soal: [
      {
        q: "Monitor termasuk dalam perangkat keras jenis...",
        opts: ["Input", "Proses", "Output", "Storage"],
        ans: 2,
      },
      {
        q: "Resolusi monitor diukur dalam satuan...",
        opts: ["Hertz", "Piksel", "Watt", "Megabyte"],
        ans: 1,
      },
      {
        q: "Resolusi monitor yang umum digunakan saat ini adalah...",
        opts: ["640×480", "800×600", "1920×1080 (Full HD)", "320×240"],
        ans: 2,
      },
      {
        q: "Monitor jenis CRT menggunakan teknologi...",
        opts: [
          "Layar datar kristal cair",
          "Tabung sinar katoda",
          "Dioda organik",
          "Lampu LED",
        ],
        ans: 1,
      },
      {
        q: "Refresh rate pada monitor diukur dalam satuan...",
        opts: ["Megapiksel", "Hz (Hertz)", "Watt", "GHz"],
        ans: 1,
      },
    ],
  },
  {
    img: imgMouse,
    nama: "Mouse",
    kategori: "Hardware",
    deskripsi:
      "Mouse adalah perangkat input yang digunakan untuk menggerakkan kursor di layar dan memberikan perintah kepada komputer melalui klik tombol.",
    fakta: [
      "Termasuk perangkat input (masukan)",
      "Ditemukan oleh Douglas Engelbart tahun 1964",
      "Terdiri dari tombol kiri, kanan, dan scroll wheel",
    ],
    soal: [
      {
        q: "Mouse termasuk dalam perangkat keras jenis...",
        opts: ["Output", "Proses", "Storage", "Input"],
        ans: 3,
      },
      {
        q: "Mouse pertama kali ditemukan oleh...",
        opts: ["Bill Gates", "Steve Jobs", "Douglas Engelbart", "Alan Turing"],
        ans: 2,
      },
      {
        q: "Fungsi scroll wheel pada mouse adalah...",
        opts: [
          "Mengklik item",
          "Menggulir halaman naik dan turun",
          "Menggerakkan kursor",
          "Mematikan komputer",
        ],
        ans: 1,
      },
      {
        q: "Mouse yang tidak menggunakan kabel disebut mouse...",
        opts: ["Optik", "Laser", "Mekanik", "Nirkabel (Wireless)"],
        ans: 3,
      },
      {
        q: "Tindakan menekan tombol mouse dua kali cepat disebut...",
        opts: ["Single click", "Right click", "Double click", "Drag"],
        ans: 2,
      },
    ],
  },
  {
    img: imgPrinter,
    nama: "Printer",
    kategori: "Hardware",
    deskripsi:
      "Printer adalah perangkat output yang digunakan untuk mencetak teks, gambar, atau dokumen dari komputer ke media fisik seperti kertas.",
    fakta: [
      "Termasuk perangkat output (keluaran)",
      "Jenis: inkjet, laser, dot matrix, dan 3D printer",
      "Kecepatan cetak diukur dalam PPM (pages per minute)",
    ],
    soal: [
      {
        q: "Printer termasuk dalam perangkat keras jenis...",
        opts: ["Input", "Proses", "Storage", "Output"],
        ans: 3,
      },
      {
        q: "Printer yang menggunakan tinta cair disebut printer...",
        opts: ["Laser", "Inkjet", "Dot matrix", "Thermal"],
        ans: 1,
      },
      {
        q: "Kecepatan cetak printer diukur dalam satuan...",
        opts: ["GHz", "Megabyte", "PPM (Pages Per Minute)", "Watt"],
        ans: 2,
      },
      {
        q: "Printer laser menggunakan ... untuk mencetak.",
        opts: ["Tinta cair", "Pita karbon", "Toner serbuk", "Kepala jarum"],
        ans: 2,
      },
      {
        q: "Printer yang dapat mencetak objek tiga dimensi disebut...",
        opts: ["Printer laser", "Printer inkjet", "Printer 3D", "Plotter"],
        ans: 2,
      },
    ],
  },
  {
    img: imgProyektor,
    nama: "Proyektor",
    kategori: "Hardware",
    deskripsi:
      "Proyektor adalah perangkat output yang memproyeksikan gambar atau video dari komputer ke permukaan layar besar, digunakan dalam presentasi dan pembelajaran.",
    fakta: [
      "Termasuk perangkat output (keluaran)",
      "Kecerahan diukur dalam lumen",
      "Digunakan untuk presentasi, kelas, dan bioskop",
    ],
    soal: [
      {
        q: "Proyektor termasuk dalam perangkat keras jenis...",
        opts: ["Input", "Proses", "Output", "Storage"],
        ans: 2,
      },
      {
        q: "Kecerahan proyektor diukur dalam satuan...",
        opts: ["Watt", "Lumen", "Hertz", "Piksel"],
        ans: 1,
      },
      {
        q: "Proyektor digunakan dalam kegiatan...",
        opts: [
          "Mencetak dokumen",
          "Menyimpan data",
          "Presentasi dan pembelajaran",
          "Memasukkan data",
        ],
        ans: 2,
      },
      {
        q: "Proyektor membutuhkan ... agar gambar terlihat jelas.",
        opts: [
          "Pencahayaan terang",
          "Ruangan gelap atau redup",
          "Koneksi internet",
          "Keyboard khusus",
        ],
        ans: 1,
      },
      {
        q: "Proyektor menampilkan gambar dengan cara...",
        opts: [
          "Mencetak ke kertas",
          "Memancarkan cahaya ke layar/permukaan",
          "Menyimpan ke memori",
          "Mengirim data ke jaringan",
        ],
        ans: 1,
      },
    ],
  },
  {
    img: imgSpeaker,
    nama: "Speaker",
    kategori: "Hardware",
    deskripsi:
      "Speaker adalah perangkat output yang mengubah sinyal listrik menjadi gelombang suara sehingga pengguna dapat mendengarkan audio dari komputer.",
    fakta: [
      "Termasuk perangkat output suara",
      "Mengubah sinyal listrik menjadi gelombang suara",
      "Kualitas suara diukur dalam Watt dan Hz",
    ],
    soal: [
      {
        q: "Speaker termasuk dalam perangkat keras jenis...",
        opts: ["Input", "Proses", "Storage", "Output"],
        ans: 3,
      },
      {
        q: "Speaker mengubah sinyal listrik menjadi...",
        opts: ["Sinyal digital", "Gelombang suara", "Gambar visual", "Data teks"],
        ans: 1,
      },
      {
        q: "Kebalikan dari speaker sebagai perangkat output suara adalah...",
        opts: ["Monitor", "Printer", "Mikrofon", "Mouse"],
        ans: 2,
      },
      {
        q: "Kualitas suara speaker biasanya diukur dalam satuan...",
        opts: ["Megabyte", "GHz", "Watt", "Piksel"],
        ans: 2,
      },
      {
        q: "Speaker yang terpasang langsung di dalam laptop disebut...",
        opts: [
          "Speaker eksternal",
          "Speaker Bluetooth",
          "Speaker internal (built-in)",
          "Subwoofer",
        ],
        ans: 2,
      },
    ],
  },
];

// ── Constants ─────────────────────────────────────────────────────────────────
const GRID = 4;
const TOTAL = GRID * GRID;
const STORAGE_SCORES   = "game_scores";
const STORAGE_UNLOCKED = "game_unlocked_levels";
const STORAGE_HISTORY  = "game_history_level6";
const STORAGE_LEVEL6_DONE = "game_level6_ever_done";
const LEVEL = 6;
const TIMER_SECONDS = 5 * 60;
const GAP = 2;
const TAB_RATIO = 0.11;

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const PHASE = {
  PUZZLE:   "puzzle",
  QUESTION: "question",
  RESULT:   "result",
  TIMEOUT:  "timeout",
};

const DIRS = [
  [ 0,  1,  1,  0], [ 0,  1,  1, -1], [ 0,  1,  1, -1], [ 0,  0,  1, -1],
  [-1,  1, -1,  0], [-1,  1, -1, -1], [-1,  1, -1, -1], [-1,  0, -1, -1],
  [ 1,  1, -1,  0], [ 1,  1, -1, -1], [ 1,  1, -1, -1], [ 1,  0, -1, -1],
  [ 1,  1,  0,  0], [ 1,  1,  0, -1], [ 1,  1,  0, -1], [ 1,  0,  0, -1],
];

// ── Responsive size hook ──────────────────────────────────────────────────────
function useResponsiveSizes() {
  function calc() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 600;
    const isTablet = vw >= 600 && vw < 900;
    let PIECE, TRAY_PIECE;
    if (isMobile) {
      const availW = vw - 32;
      const availH = vh - 160;
      const maxByW = Math.floor(availW / 4) - GAP * 2;
      const maxByH = Math.floor(availH * 0.45) - 40;
      PIECE = Math.max(36, Math.min(60, maxByW, maxByH));
      TRAY_PIECE = Math.round(PIECE * 0.75);
    } else if (isTablet) {
      const availW = vw - 48;
      const availH = vh - 120;
      const boardMaxW = Math.floor(availW * 0.52 / 4) - GAP * 2;
      const maxByH    = Math.floor(availH) - 80;
      PIECE = Math.max(48, Math.min(80, boardMaxW, maxByH));
      TRAY_PIECE = Math.round(PIECE * 0.75);
    } else {
      const centerW = vw - 80;
      const centerH = vh - 60 - 48;
      const byWidth  = Math.floor((centerW - 104) / 7.12);
      const byHeight = Math.floor(centerH) - 60;
      PIECE = Math.max(52, Math.min(110, byWidth, byHeight));
      TRAY_PIECE = Math.round(PIECE * 0.78);
    }
    return { PIECE, TRAY_PIECE, isMobile, isTablet };
  }
  const [sizes, setSizes] = useState(calc);
  useEffect(() => {
    const handler = () => setSizes(calc());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return sizes;
}

// ── PuzzlePiece ───────────────────────────────────────────────────────────────
function PuzzlePiece({ imgSrc, pieceIdx, size, grid = 4 }) {
  const canvasRef = useRef(null);
  const TAB = size * TAB_RATIO;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pad = Math.ceil(TAB * 1.5);
    canvas.width  = size + pad * 2;
    canvas.height = size + pad * 2;
    const img = new Image();
    img.src = imgSrc;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(pad, pad);
      const path = makePuzzlePath(size, TAB, DIRS[pieceIdx]);
      ctx.save();
      ctx.clip(path);
      const col = pieceIdx % grid;
      const row = Math.floor(pieceIdx / grid);
      const totalSize = size * grid;
      const srcPadX = img.naturalWidth  * (pad / totalSize);
      const srcPadY = img.naturalHeight * (pad / totalSize);
      ctx.drawImage(
        img,
        (col * img.naturalWidth)  / grid - srcPadX,
        (row * img.naturalHeight) / grid - srcPadY,
        img.naturalWidth  / grid + srcPadX * 2,
        img.naturalHeight / grid + srcPadY * 2,
        -pad, -pad,
        size + pad * 2,
        size + pad * 2,
      );
      ctx.restore();
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 0.5;
      ctx.stroke(path);
      ctx.restore();
    };
    if (img.complete) draw();
    else img.onload = draw;
  }, [imgSrc, pieceIdx, size, grid, TAB]);
  const pad = Math.ceil(TAB * 1.5);
  return <canvas ref={canvasRef} style={{ display: "block", margin: `-${pad}px` }} />;
}

function makePuzzlePath(s, T, dirs) {
  const path = new Path2D();
  const mid = s / 2;
  const [top, right, bottom, left] = dirs;
  path.moveTo(0, 0);
  if (top === 0) {
    path.lineTo(s, 0);
  } else {
    const sign = top > 0 ? -1 : 1;
    path.lineTo(mid - T * 0.6, 0);
    path.bezierCurveTo(mid - T * 0.6, sign * T * 0.5, mid - T * 1.1, sign * T * 1.1, mid, sign * T * 1.1);
    path.bezierCurveTo(mid + T * 1.1, sign * T * 1.1, mid + T * 0.6, sign * T * 0.5, mid + T * 0.6, 0);
    path.lineTo(s, 0);
  }
  if (right === 0) {
    path.lineTo(s, s);
  } else {
    const sign = right > 0 ? 1 : -1;
    path.lineTo(s, mid - T * 0.6);
    path.bezierCurveTo(s + sign * T * 0.5, mid - T * 0.6, s + sign * T * 1.1, mid - T * 1.1, s + sign * T * 1.1, mid);
    path.bezierCurveTo(s + sign * T * 1.1, mid + T * 1.1, s + sign * T * 0.5, mid + T * 0.6, s, mid + T * 0.6);
    path.lineTo(s, s);
  }
  if (bottom === 0) {
    path.lineTo(0, s);
  } else {
    const sign = bottom > 0 ? 1 : -1;
    path.lineTo(mid + T * 0.6, s);
    path.bezierCurveTo(mid + T * 0.6, s + sign * T * 0.5, mid + T * 1.1, s + sign * T * 1.1, mid, s + sign * T * 1.1);
    path.bezierCurveTo(mid - T * 1.1, s + sign * T * 1.1, mid - T * 0.6, s + sign * T * 0.5, mid - T * 0.6, s);
    path.lineTo(0, s);
  }
  if (left === 0) {
    path.lineTo(0, 0);
  } else {
    const sign = left > 0 ? -1 : 1;
    path.lineTo(0, mid + T * 0.6);
    path.bezierCurveTo(sign * T * 0.5, mid + T * 0.6, sign * T * 1.1, mid + T * 1.1, sign * T * 1.1, mid);
    path.bezierCurveTo(sign * T * 1.1, mid - T * 1.1, sign * T * 0.5, mid - T * 0.6, 0, mid - T * 0.6);
    path.lineTo(0, 0);
  }
  path.closePath();
  return path;
}

// ── TimerDisplay ──────────────────────────────────────────────────────────────
function TimerDisplay({ seconds }) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  const urgent = seconds <= 30;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8, padding: "6px 16px",
      border: `1px solid ${urgent ? "rgba(248,113,113,.6)" : "rgba(180,0,255,.35)"}`,
      background: urgent ? "rgba(248,113,113,.08)" : "rgba(10,2,25,.6)",
      animation: urgent ? "timerPulse 1s ease-in-out infinite" : "none",
    }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke={urgent ? "#F87171" : "rgba(180,0,255,.6)"} strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
      <span style={{
        fontFamily: "'Orbitron', monospace", fontSize: 13, fontWeight: 900,
        letterSpacing: 3, color: urgent ? "#F87171" : "rgba(200,150,255,.85)",
        textShadow: urgent ? "0 0 12px #F87171" : "none",
      }}>{m}:{s}</span>
    </div>
  );
}

// ── HistoryPanel ──────────────────────────────────────────────────────────────
function HistoryPanel({ history, onClear }) {
  return (
    <div className="side-panel">
      <div className="panel-header">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(180,0,255,.6)" strokeWidth="2">
          <path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" />
        </svg>
        <span>RIWAYAT MAIN</span>
        {history.length > 0 && (
          <button className="clear-btn" onClick={onClear} title="Hapus riwayat">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" />
            </svg>
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="panel-empty">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(180,0,255,.2)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
          </svg>
          <p>Belum ada riwayat</p>
          <p style={{ fontSize: 9, marginTop: 4, opacity: 0.6 }}>Selesaikan game pertamamu!</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((h, i) => {
            const scoreColor = h.score >= 100 ? "#34D399" : h.score >= 90 ? "#FBBF24" : "#F87171";
            const isTimeout = h.timeout;
            return (
              <div key={i} className="history-item">
                <div className="history-item-top">
                  <span className="history-rank">#{history.length - i}</span>
                  <span className="history-hw" title={h.hw}>
                    {h.hw.length > 14 ? h.hw.slice(0, 13) + "…" : h.hw}
                  </span>
                  {isTimeout ? (
                    <span className="history-timeout-badge">TIMEOUT</span>
                  ) : (
                    <span className="history-score" style={{ color: scoreColor, textShadow: `0 0 8px ${scoreColor}55` }}>
                      {h.score}
                    </span>
                  )}
                </div>
                <div className="history-item-stats">
                  <div className="hstat">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(180,0,255,.45)" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Sisa {h.timeLeft}</span>
                  </div>
                  <div className="hstat">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(180,0,255,.45)" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>{h.attempts} percobaan</span>
                  </div>
                  <div className="hstat">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(180,0,255,.45)" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <span>{h.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {history.length > 0 && (() => {
        const finished = history.filter((h) => !h.timeout);
        const best = finished.length ? Math.max(...finished.map((h) => h.score)) : 0;
        const avg  = finished.length ? Math.round(finished.reduce((a, h) => a + h.score, 0) / finished.length) : 0;
        return (
          <div className="history-stats-bar">
            <div className="hbar-item">
              <span className="hbar-val" style={{ color: "#34D399" }}>{best || "–"}</span>
              <span className="hbar-label">TERBAIK</span>
            </div>
            <div className="hbar-divider" />
            <div className="hbar-item">
              <span className="hbar-val" style={{ color: "#FBBF24" }}>{avg || "–"}</span>
              <span className="hbar-label">RATA-RATA</span>
            </div>
            <div className="hbar-divider" />
            <div className="hbar-item">
              <span className="hbar-val" style={{ color: "#c084fc" }}>{history.length}</span>
              <span className="hbar-label">TOTAL</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ── InfoPanel ─────────────────────────────────────────────────────────────────
function InfoPanel({ hw }) {
  return (
    <div className="side-panel">
      <div className="panel-header">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(180,0,255,.6)" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
        </svg>
        <span>INFO HARDWARE</span>
      </div>
      <div className="info-hw-hero">
        <div className="info-hw-img-wrap">
          <img src={hw.img} alt={hw.nama} className="info-hw-img" />
          <div className="info-hw-img-glow" />
        </div>
        <p className="info-hw-name">{hw.nama}</p>
        <span className="info-kategori-badge">
          {hw.kategori.toUpperCase()}
        </span>
      </div>
      <div className="info-section">
        <p className="info-section-label">DESKRIPSI</p>
        <p className="info-desc">{hw.deskripsi}</p>
      </div>
      <div className="info-section">
        <p className="info-section-label">FAKTA MENARIK</p>
        <div className="info-fakta-list">
          {hw.fakta.map((f, i) => (
            <div key={i} className="info-fakta-item">
              <span className="info-fakta-dot" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="info-tip">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"
          style={{ flexShrink: 0, marginTop: 1 }}>
          <path d="M12 2a7 7 0 0 1 7 7c0 3-2 5-4 6.5V17H9v-1.5C7 14 5 12 5 9a7 7 0 0 1 7-7z" />
          <path d="M9 21h6M10 17v-2M14 17v-2" />
        </svg>
        <p>Susun puzzle 4×4 dengan benar untuk membuka pertanyaan tentang hardware ini!</p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Level6() {
  const navigate = useNavigate();
  const { PIECE, TRAY_PIECE, isMobile } = useResponsiveSizes();

  const [hw] = useState(
    () => HARDWARE_LIST[Math.floor(Math.random() * HARDWARE_LIST.length)],
  );

  const [phase, setPhase]           = useState(PHASE.PUZZLE);
  const [tray, setTray]             = useState(() => shuffle([...Array(TOTAL).keys()]));
  const [board, setBoard]           = useState(Array(TOTAL).fill(null));
  const [dragSrc, setDragSrc]       = useState(null);
  const [dragOver, setDragOver]     = useState(null);
  const [solved, setSolved]         = useState(false);
  const [showBack, setShowBack]     = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showInfo, setShowInfo]       = useState(false);

  const [showLightning, setShowLightning] = useState(false);
  const lightningRef = useRef(false);
  const petirAnimRef = useRef(null);
  const [showWinAnim, setShowWinAnim]     = useState(false);

  const [soalList, setSoalList]   = useState([]);
  const [curSoal, setCurSoal]     = useState(null);
  const [attempt, setAttempt]     = useState(0);
  const [selAns, setSelAns]       = useState(null);
  const [answered, setAnswered]   = useState(false);

  const [finalScore, setFinalScore]           = useState(0);
  const [isNewRec, setIsNewRec]               = useState(false);
  const [isFirstEverDone, setIsFirstEverDone] = useState(false);
  const [prevScore, setPrevScore] = useState(() => {
    const scores = getUserItem(STORAGE_SCORES, {});
    return scores[LEVEL] ?? null;
  });

  const [history, setHistory] = useState(() => getUserItem(STORAGE_HISTORY, []));

  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef    = useRef(null);
  const phaseRef    = useRef(phase);
  const attemptRef  = useRef(attempt);
  const timeLeftRef = useRef(timeLeft);

  useEffect(() => { phaseRef.current   = phase;   }, [phase]);
  useEffect(() => { attemptRef.current = attempt; }, [attempt]);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          if (phaseRef.current === PHASE.PUZZLE || phaseRef.current === PHASE.QUESTION) {
            const now = new Date();
            const entry = {
              hw: hw.nama, score: 0, timeLeft: "00:00",
              attempts: attemptRef.current, timeout: true,
              date: `${now.getDate()}/${now.getMonth() + 1} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
            };
            setHistory((prev) => {
              const next = [entry, ...prev].slice(0, 10);
              setUserItem(STORAGE_HISTORY, next);
              return next;
            });
            setPhase(PHASE.TIMEOUT);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (phase === PHASE.RESULT || phase === PHASE.TIMEOUT) clearInterval(timerRef.current);
  }, [phase]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // ── Reset ──────────────────────────────────────────────────────────────────
  const initPuzzle = useCallback(() => {
    clearInterval(timerRef.current);
    setTray(shuffle([...Array(TOTAL).keys()]));
    setBoard(Array(TOTAL).fill(null));
    setSolved(false);
    setPhase(PHASE.PUZZLE);
    setAttempt(0);
    setSelAns(null);
    setAnswered(false);
    setFinalScore(0);
    setIsNewRec(false);
    setIsFirstEverDone(false);
    setShowWinAnim(false);
    setShowLightning(false);
    lightningRef.current = false;
    if (petirAnimRef.current) { petirAnimRef.current.stop(); petirAnimRef.current.goToAndStop(0, true); }
    setTimeLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          if (phaseRef.current === PHASE.PUZZLE || phaseRef.current === PHASE.QUESTION) {
            const now = new Date();
            const entry = {
              hw: hw.nama, score: 0, timeLeft: "00:00",
              attempts: attemptRef.current, timeout: true,
              date: `${now.getDate()}/${now.getMonth() + 1} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
            };
            setHistory((prev) => {
              const next = [entry, ...prev].slice(0, 10);
              setUserItem(STORAGE_HISTORY, next);
              return next;
            });
            setPhase(PHASE.TIMEOUT);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [hw.nama]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Trigger solved ─────────────────────────────────────────────────────────
  const triggerSolved = useCallback(() => {
    setSolved(true);
    setTimeout(() => {
      const shuffled = shuffle(hw.soal);
      setSoalList(shuffled);
      setCurSoal(shuffled[0]);
      setPhase(PHASE.QUESTION);
      setAttempt(0);
      setSelAns(null);
      setAnswered(false);
    }, 900);
  }, [hw.soal]);

  // ── Save score ─────────────────────────────────────────────────────────────
  const saveScore = useCallback((score, currentAttempt) => {
    const scores = getUserItem(STORAGE_SCORES, {});
    const prev = scores[LEVEL] ?? 0;
    const isNew = score > prev;
    if (isNew) scores[LEVEL] = score;
    setUserItem(STORAGE_SCORES, scores);

    const unlocked = getUserItem(STORAGE_UNLOCKED, 1);
    if (LEVEL >= unlocked) setUserItem(STORAGE_UNLOCKED, LEVEL + 1);

    setPrevScore(isNew ? score : prev === 0 ? null : prev);

    const alreadyDone = getUserItem(STORAGE_LEVEL6_DONE, false);
    if (!alreadyDone) {
      setUserItem(STORAGE_LEVEL6_DONE, true);
      setIsFirstEverDone(true);
    } else {
      setIsFirstEverDone(false);
    }

    const now = new Date();
    const entry = {
      hw: hw.nama, score,
      timeLeft: formatTime(timeLeftRef.current),
      attempts: currentAttempt + 1, timeout: false,
      date: `${now.getDate()}/${now.getMonth() + 1} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
    };
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 10);
      setUserItem(STORAGE_HISTORY, next);
      return next;
    });

    return isNew;
  }, [hw.nama]);

  // ── Answer handler ─────────────────────────────────────────────────────────
  const handleAnswer = (idx) => {
    if (answered) return;
    sounds.click.play();
    setSelAns(idx);
    setAnswered(true);
    const correct = idx === curSoal.ans;
    setTimeout(() => {
      if (correct) {
        const score = Math.max(100 - attempt * 10, 70);
        const isNew = saveScore(score, attempt);
        setFinalScore(score);
        setIsNewRec(isNew);
        sounds.win.stop();
        sounds.win.play();
        setShowWinAnim(true);
        setPhase(PHASE.RESULT);
      } else {
        const nextAttempt = attempt + 1;
        const nextSoal = soalList[nextAttempt] || soalList[0];
        setCurSoal(nextSoal);
        setAttempt(nextAttempt);
        setSelAns(null);
        setAnswered(false);
      }
    }, 1000);
  };

  // ── Drag & Drop ────────────────────────────────────────────────────────────
  const onDragStartTray  = (e, pi)  => { setDragSrc({ zone: "tray", pi }); e.dataTransfer.effectAllowed = "move"; };
  const onDragStartBoard = (e, si)  => { if (board[si] === null) return; setDragSrc({ zone: "board", si, pi: board[si] }); e.dataTransfer.effectAllowed = "move"; };
  const onDragOverHandler = (e, key) => { e.preventDefault(); setDragOver(key); };
  const onDragLeave = () => setDragOver(null);

  const onDropBoard = useCallback((e, si) => {
    e.preventDefault();
    setDragOver(null);
    if (!dragSrc) return;
    sounds.click.play();
    const nb = [...board];
    const nt = [...tray];
    if (dragSrc.zone === "tray") {
      const occ = nb[si];
      nb[si] = dragSrc.pi;
      const ti = nt.indexOf(dragSrc.pi);
      if (ti !== -1) nt.splice(ti, 1);
      if (occ !== null) nt.push(occ);
    } else {
      if (dragSrc.si !== si) [nb[dragSrc.si], nb[si]] = [nb[si], nb[dragSrc.si]];
    }
    const allFilled    = nb.every((p) => p !== null);
    const correctOrder = nb.every((p, i) => p !== null && p === i);
    setBoard(nb);
    setTray(nt);
    setDragSrc(null);
    if (correctOrder) {
      triggerSolved();
    } else if (allFilled && !lightningRef.current) {
      lightningRef.current = true;
      if (petirAnimRef.current) petirAnimRef.current.goToAndPlay(0, true);
      sounds.petir.stop();
      sounds.petir.play();
      setShowLightning(true);
      setTimeout(() => {
        setShowLightning(false);
        lightningRef.current = false;
      }, 1800);
    }
  }, [board, tray, dragSrc, triggerSolved]);

  const onDropTray = (e) => {
    e.preventDefault();
    setDragOver(null);
    if (!dragSrc || dragSrc.zone !== "board") return;
    sounds.click.play();
    const nb = [...board];
    const pi = nb[dragSrc.si];
    if (pi === null) return;
    nb[dragSrc.si] = null;
    setBoard(nb);
    setTray((p) => [...p, pi]);
    setDragSrc(null);
  };

  const clearHistory = () => {
    setHistory([]);
    removeUserItem(STORAGE_HISTORY);
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const sc = finalScore >= 100 ? "#34D399" : finalScore >= 90 ? "#FBBF24" : "#F87171";
  const sl = finalScore >= 100 ? "SEMPURNA!" : finalScore >= 90 ? "BAGUS!" : "BERHASIL!";
  const BOARD_TOTAL = PIECE * GRID + GAP * (GRID - 1);
  const TRAY_COLS = 4;
  const TRAY_ROWS = 4;
  const attemptLabel  = attempt === 0 ? "PERTANYAAN 1 — NILAI 100" : attempt === 1 ? "PERTANYAAN 2 — NILAI 90" : `PERTANYAAN ${attempt + 1} — NILAI ${Math.max(100 - attempt * 10, 70)}`;
  const attemptColor  = attempt === 0 ? "#34D399" : attempt === 1 ? "#FBBF24" : "#F87171";

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow: hidden; width: 100%; height: 100%; }

        @keyframes timerPulse { 0%,100%{opacity:1;box-shadow:0 0 0 rgba(248,113,113,0)} 50%{opacity:.85;box-shadow:0 0 16px rgba(248,113,113,.4)} }
        @keyframes gm  { 0%{background-position:0 0} 100%{background-position:40px 40px} }
        @keyframes si  { 0%{transform:scale(.95);opacity:0} 60%{transform:scale(1.02)} 100%{transform:scale(1);opacity:1} }
        @keyframes sg  { from{text-shadow:0 0 10px #34D399} to{text-shadow:0 0 30px #34D399,0 0 60px #10b981} }
        @keyframes oi  { from{opacity:0} to{opacity:1} }
        @keyframes mi  { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes sci { from{opacity:0;transform:scale(.5)} to{opacity:1;transform:scale(1)} }
        @keyframes pg  { 0%,100%{border-color:rgba(180,0,255,.2);box-shadow:none} 50%{border-color:rgba(217,70,239,.55);box-shadow:0 0 12px rgba(180,0,255,.3)} }
        @keyframes timeoutPulse { 0%,100%{text-shadow:0 0 10px #F87171} 50%{text-shadow:0 0 30px #F87171,0 0 60px #dc2626} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slotShake { 0%,100%{transform:translate(0,0)} 15%{transform:translate(-6px,2px)} 30%{transform:translate(6px,-2px)} 45%{transform:translate(-4px,3px)} 60%{transform:translate(4px,-1px)} 75%{transform:translate(-2px,2px)} 90%{transform:translate(2px,-1px)} }
        @keyframes electricBorder { 0%,100%{box-shadow:0 0 8px #F87171,0 0 2px #F87171,inset 0 0 10px rgba(248,113,113,.15)} 25%{box-shadow:0 0 25px #F87171,0 0 50px rgba(248,113,113,.6),inset 0 0 25px rgba(248,113,113,.4)} 50%{box-shadow:0 0 12px #ff6060,0 0 4px #ff6060,inset 0 0 15px rgba(248,113,113,.2)} 75%{box-shadow:0 0 30px #F87171,0 0 60px rgba(248,113,113,.7),inset 0 0 30px rgba(248,113,113,.45)} }
        @keyframes electricFlash { 0%,100%{opacity:0} 10%,30%,50%,70%,90%{opacity:1} 20%,40%,60%,80%{opacity:0.3} }

        .lv { width:100vw; height:100vh; background:#0a0515; display:flex; flex-direction:column; position:relative; font-family:'Orbitron',monospace; overflow:hidden; }
        .lv-grid { position:fixed; inset:0; background-image:linear-gradient(rgba(139,0,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(139,0,255,.06) 1px,transparent 1px); background-size:40px 40px; animation:gm 20s linear infinite; z-index:0; pointer-events:none; }
        .lv-glow { position:fixed; inset:0; z-index:0; pointer-events:none; background:radial-gradient(ellipse 60% 40% at 20% 20%,rgba(120,0,255,.12) 0%,transparent 70%),radial-gradient(ellipse 50% 60% at 80% 80%,rgba(180,0,255,.08) 0%,transparent 70%); }

        .lv-hdr { position:relative; z-index:10; display:flex; align-items:center; justify-content:space-between; padding:10px 16px; border-bottom:1px solid rgba(180,0,255,.25); background:rgba(10,2,25,.88); backdrop-filter:blur(10px); flex-shrink:0; gap:8px; }
        .lv-back { display:flex; align-items:center; gap:6px; background:transparent; border:1px solid rgba(180,0,255,.4); color:#c084fc; padding:7px 12px; cursor:pointer; font-family:'Orbitron',monospace; font-size:9px; font-weight:700; letter-spacing:2px; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); transition:all .25s; position:relative; overflow:hidden; white-space:nowrap; }
        .lv-back::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,#c084fc22,transparent); transform:translateX(-100%); transition:transform .4s; }
        .lv-back:hover::after { transform:translateX(100%); }
        .lv-back:hover { border-color:#c084fc; box-shadow:0 0 16px #7c3aed55; transform:translateX(-3px); }
        .lv-htitle { flex:1; text-align:center; min-width:0; }
        .lv-htitle h1 { font-size:clamp(11px,2.5vw,16px); font-weight:900; letter-spacing:clamp(2px,0.5vw,4px); color:#fff; text-shadow:0 0 20px rgba(180,0,255,.8); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .lv-htitle p  { font-size:clamp(7px,1.5vw,9px); letter-spacing:clamp(1px,0.3vw,3px); color:rgba(180,0,255,.5); margin-top:2px; font-family:'Rajdhani'; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .lv-badge { background:linear-gradient(135deg,#7c3aed,#a855f7); color:white; padding:7px 12px; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); font-size:clamp(8px,1.5vw,10px); font-weight:900; letter-spacing:2px; box-shadow:0 0 20px #7c3aed66; white-space:nowrap; flex-shrink:0; }
        .lv-hdr-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }

        .lv-body  { flex:1; position:relative; z-index:10; display:flex; gap:0; overflow:hidden; min-height:0; }
        .lv-center { flex:1; display:flex; align-items:center; justify-content:center; padding:16px; overflow:hidden; min-width:0; scrollbar-width:none; }
        .lv-center::-webkit-scrollbar { display:none; }

        .side-panel { width:220px; flex-shrink:0; display:flex; flex-direction:column; overflow:hidden; }
        @media (max-width:899px) { .side-panel { display:none; } }

        .panel-header { display:flex; align-items:center; gap:7px; padding:12px 14px 10px; border-bottom:1px solid rgba(180,0,255,.12); flex-shrink:0; }
        .panel-header span { font-size:8px; font-weight:900; letter-spacing:3px; color:rgba(180,0,255,.55); font-family:'Rajdhani'; flex:1; }
        .clear-btn { background:none; border:none; cursor:pointer; color:rgba(180,0,255,.35); padding:2px; transition:color .2s; display:flex; align-items:center; }
        .clear-btn:hover { color:rgba(248,113,113,.7); }

        .panel-empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; padding:20px; }
        .panel-empty p { font-family:'Rajdhani'; font-size:11px; color:rgba(180,0,255,.3); letter-spacing:1px; text-align:center; }

        .history-list { flex:1; overflow-y:auto; padding:8px; display:flex; flex-direction:column; gap:6px; scrollbar-width:thin; scrollbar-color:rgba(180,0,255,.2) transparent; }
        .history-list::-webkit-scrollbar { width:3px; }
        .history-list::-webkit-scrollbar-thumb { background:rgba(180,0,255,.25); border-radius:2px; }
        .history-item { padding:9px 10px; background:rgba(15,5,35,.6); border:1px solid rgba(180,0,255,.12); animation:fadeSlideIn .3s ease; }
        .history-item:hover { border-color:rgba(180,0,255,.28); background:rgba(20,5,45,.7); }
        .history-item-top  { display:flex; align-items:center; gap:6px; margin-bottom:6px; }
        .history-rank  { font-size:9px; font-weight:900; color:rgba(180,0,255,.35); letter-spacing:1px; flex-shrink:0; }
        .history-hw    { font-family:'Rajdhani'; font-size:11px; font-weight:700; color:rgba(200,160,255,.8); flex:1; overflow:hidden; }
        .history-score { font-size:14px; font-weight:900; letter-spacing:1px; }
        .history-timeout-badge { font-size:8px; font-weight:700; color:#F87171; background:rgba(248,113,113,.1); border:1px solid rgba(248,113,113,.25); padding:1px 5px; letter-spacing:1px; font-family:'Rajdhani'; }
        .history-item-stats { display:flex; flex-direction:column; gap:3px; }
        .hstat { display:flex; align-items:center; gap:5px; }
        .hstat span { font-family:'Rajdhani'; font-size:10px; color:rgba(180,0,255,.4); letter-spacing:.5px; }
        .history-stats-bar { display:flex; align-items:center; justify-content:space-around; padding:10px 8px; border-top:1px solid rgba(180,0,255,.12); flex-shrink:0; background:rgba(10,2,25,.5); }
        .hbar-item  { display:flex; flex-direction:column; align-items:center; gap:2px; }
        .hbar-val   { font-size:15px; font-weight:900; letter-spacing:1px; }
        .hbar-label { font-family:'Rajdhani'; font-size:8px; color:rgba(180,0,255,.35); letter-spacing:2px; }
        .hbar-divider { width:1px; height:28px; background:rgba(180,0,255,.12); }

        .info-hw-hero { display:flex; flex-direction:column; align-items:center; padding:16px 14px 12px; border-bottom:1px solid rgba(180,0,255,.1); flex-shrink:0; }
        .info-hw-img-wrap { position:relative; width:80px; height:80px; margin-bottom:10px; }
        .info-hw-img { width:80px; height:80px; object-fit:contain; position:relative; z-index:1; filter:drop-shadow(0 0 12px rgba(180,0,255,.4)); }
        .info-hw-img-glow { position:absolute; inset:-8px; background:radial-gradient(ellipse 80% 80% at 50% 50%,rgba(180,0,255,.15),transparent 70%); z-index:0; border-radius:50%; }
        .info-hw-name { font-size:12px; font-weight:900; letter-spacing:2px; color:#fff; text-align:center; margin-bottom:7px; text-shadow:0 0 12px rgba(180,0,255,.5); }
        .info-kategori-badge { padding:3px 10px; font-family:'Rajdhani'; font-size:9px; font-weight:700; letter-spacing:2px; background:rgba(180,0,255,.1); border:1px solid rgba(180,0,255,.4); color:#c084fc; }
        .info-section { padding:11px 14px 0; flex-shrink:0; }
        .info-section-label { font-size:7px; font-weight:900; letter-spacing:3px; color:rgba(180,0,255,.4); margin-bottom:6px; font-family:'Rajdhani'; }
        .info-desc  { font-family:'Rajdhani'; font-size:11px; line-height:1.65; color:rgba(200,160,255,.65); }
        .info-fakta-list { display:flex; flex-direction:column; gap:5px; }
        .info-fakta-item { display:flex; align-items:flex-start; gap:7px; font-family:'Rajdhani'; font-size:11px; color:rgba(200,160,255,.6); line-height:1.5; }
        .info-fakta-dot  { width:4px; height:4px; border-radius:50%; background:rgba(217,70,239,.6); flex-shrink:0; margin-top:5px; box-shadow:0 0 6px rgba(217,70,239,.5); }
        .info-tip { display:flex; align-items:flex-start; gap:8px; margin:12px 14px 14px; padding:9px 10px; background:rgba(251,191,36,.06); border:1px solid rgba(251,191,36,.18); }
        .info-tip p { font-family:'Rajdhani'; font-size:10px; line-height:1.55; color:rgba(251,191,36,.65); }

        .lv-main { display:flex; align-items:flex-start; justify-content:center; gap:24px; flex-wrap:nowrap; flex-direction:row; }
        @media (max-width:599px) { .lv-main { gap:10px; } }

        .lv-board-wrap  { display:flex; flex-direction:column; align-items:center; gap:10px; }
        .lv-board-label { font-size:8px; letter-spacing:3px; color:rgba(180,0,255,.35); font-family:'Rajdhani'; }
        .lv-board { display:grid; position:relative; background:rgba(180,0,255,.06); border:1px solid rgba(180,0,255,.35); box-shadow:0 0 40px rgba(180,0,255,.18),inset 0 0 30px rgba(180,0,255,.04); overflow:visible; }
        .lv-slot { position:relative; display:flex; align-items:center; justify-content:center; background:rgba(10,2,25,.8); border:1px dashed rgba(180,0,255,.15); transition:all .2s; overflow:visible; }
        .lv-slot.over { border-color:rgba(217,70,239,.7); background:rgba(120,0,200,.15); box-shadow:inset 0 0 20px rgba(180,0,255,.2); }
        .lv-slot.lightning { animation:slotShake 0.5s ease forwards, electricBorder 1.8s ease infinite; border-color:#F87171 !important; border-style:solid !important; border-width:2px !important; }
        .lv-slot-empty { width:35%; height:35%; border:1px dashed rgba(180,0,255,.1); border-radius:4px; }
        .lv-placed { width:100%; height:100%; cursor:grab; display:flex; align-items:center; justify-content:center; transition:filter .2s; overflow:visible; z-index:3; }
        .lv-placed:hover { filter:brightness(1.15); }
        .lv-placed:active { cursor:grabbing; }
        .lv-solved-overlay { position:absolute; inset:0; z-index:5; display:flex; align-items:center; justify-content:center; background:rgba(52,211,153,.12); border:2px solid #34D399; animation:si .5s ease; }
        .lv-solved-txt { font-size:22px; font-weight:900; color:#34D399; letter-spacing:6px; animation:sg 1s ease-in-out infinite alternate; }
        .lv-lightning-board-overlay { position:absolute; inset:-20%; z-index:6; pointer-events:none; display:flex; align-items:center; justify-content:center; }

        .lv-preview-row { display:flex; align-items:center; justify-content:space-between; }
        .lv-prev-btn { display:flex; align-items:center; gap:8px; cursor:pointer; background:none; border:none; padding:0; opacity:.65; transition:opacity .2s; }
        .lv-prev-btn:hover { opacity:1; }
        .lv-prev-btn span { font-size:8px; color:rgba(180,0,255,.6); letter-spacing:2px; font-family:'Rajdhani'; }
        .lv-prev-img { width:48px; height:48px; border:1px solid rgba(180,0,255,.4); overflow:hidden; transition:box-shadow .2s; }
        .lv-prev-btn:hover .lv-prev-img { box-shadow:0 0 16px rgba(180,0,255,.5); }
        .lv-prev-img img { width:100%; height:100%; object-fit:cover; }
        .lv-hint-txt { font-size:8px; color:rgba(200,150,255,.3); line-height:1.9; font-family:'Rajdhani'; letter-spacing:.5px; text-align:right; }
        @media (max-width:599px) { .lv-hint-txt { display:none; } }

        .lv-tray-wrap  { display:flex; flex-direction:column; align-items:center; gap:10px; }
        .lv-tray-label { font-size:8px; font-weight:700; letter-spacing:3px; color:rgba(180,0,255,.4); font-family:'Rajdhani'; }
        .lv-tray { display:grid; gap:10px; padding:12px; border:1px solid rgba(180,0,255,.18); background:rgba(10,2,25,.5); transition:all .2s; }
        .lv-tray.over { border-color:rgba(217,70,239,.45); background:rgba(120,0,200,.07); }
        .lv-tray-slot { display:flex; align-items:center; justify-content:center; border:1px dashed rgba(180,0,255,.15); background:rgba(15,5,35,.35); transition:all .2s; position:relative; }
        .lv-tray-slot.has-piece { border-color:rgba(180,0,255,.3); }
        .lv-tray-slot:hover { border-color:rgba(180,0,255,.35); }
        .lv-tray-piece { cursor:grab; transition:transform .2s,filter .2s; position:relative; }
        .lv-tray-piece:hover { transform:scale(1.05); filter:brightness(1.2); }
        .lv-tray-piece:active { cursor:grabbing; transform:scale(0.98); }
        .lv-piece-glow { position:absolute; inset:-3px; pointer-events:none; border:1px solid rgba(180,0,255,.4); animation:pg 2.5s ease-in-out infinite; }

        .lv-win-anim { position:fixed; inset:0; z-index:51; pointer-events:none; background:transparent; display:flex; align-items:center; justify-content:center; overflow:hidden; }

        .lv-overlay { position:fixed; inset:0; z-index:50; display:flex; align-items:center; justify-content:center; background:rgba(0,5,15,.88); backdrop-filter:blur(12px); animation:oi .2s ease; padding:16px; }
        .lv-modal { position:relative; background:linear-gradient(135deg,rgba(20,5,45,.98),rgba(10,2,30,.98)); border:1px solid rgba(180,0,255,.5); padding:28px 32px; text-align:center; max-width:480px; width:100%; box-shadow:0 0 60px rgba(180,0,255,.3); animation:mi .3s cubic-bezier(.23,1,.32,1); max-height:90vh; overflow-y:auto; }
        @media (max-width:480px) { .lv-modal { padding:20px 16px; } }
        .lv-c { position:absolute; width:14px; height:14px; border-color:rgba(217,70,239,.65); border-style:solid; }
        .lv-c.tl{top:8px;left:8px;border-width:2px 0 0 2px} .lv-c.tr{top:8px;right:8px;border-width:2px 2px 0 0}
        .lv-c.bl{bottom:8px;left:8px;border-width:0 0 2px 2px} .lv-c.br{bottom:8px;right:8px;border-width:0 2px 2px 0}
        .lv-mtop { height:2px; margin:-28px -32px 24px; }
        @media (max-width:480px) { .lv-mtop { margin:-20px -16px 20px; } }
        .lv-mtitle { font-size:clamp(15px,4vw,20px); font-weight:900; letter-spacing:clamp(2px,0.8vw,4px); color:#fff; text-shadow:0 0 20px rgba(217,70,239,.7); margin-bottom:12px; }
        .lv-mdesc  { font-family:'Rajdhani'; font-size:clamp(12px,3vw,14px); line-height:1.7; color:rgba(200,160,255,.8); margin-bottom:24px; }
        .lv-mwarn  { color:rgba(248,113,113,.9); font-size:12px; font-weight:700; }
        .lv-macts  { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }

        .lv-btn   { padding:10px 18px; font-family:'Orbitron',monospace; font-size:clamp(8px,2vw,10px); font-weight:900; letter-spacing:2px; cursor:pointer; border:none; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); transition:all .2s; white-space:nowrap; }
        .lv-btn-p { background:linear-gradient(135deg,#7c3aed,#a855f7,#d946ef); color:#fff; box-shadow:0 0 20px rgba(180,0,255,.4); }
        .lv-btn-p:hover { box-shadow:0 0 30px rgba(217,70,239,.7); transform:translateY(-2px); }
        .lv-btn-s { background:transparent; color:#c084fc; border:1px solid rgba(180,0,255,.4); }
        .lv-btn-s:hover { background:rgba(180,0,255,.1); color:#e879f9; transform:translateY(-2px); }
        .lv-btn-g { background:linear-gradient(135deg,#059669,#10b981); color:#fff; box-shadow:0 0 20px rgba(52,211,153,.35); }
        .lv-btn-g:hover { box-shadow:0 0 30px rgba(52,211,153,.65); transform:translateY(-2px); }
        .lv-btn-r { background:linear-gradient(135deg,#dc2626,#ef4444); color:#fff; box-shadow:0 0 20px rgba(248,113,113,.35); }
        .lv-btn-r:hover { box-shadow:0 0 30px rgba(248,113,113,.65); transform:translateY(-2px); }

        .lv-qcard { background:linear-gradient(135deg,rgba(20,5,45,.95),rgba(15,5,35,.95)); border:1px solid rgba(180,0,255,.38); padding:24px 28px; box-shadow:0 0 40px rgba(180,0,255,.18); margin-bottom:12px; }
        @media (max-width:480px) { .lv-qcard { padding:16px; } }
        .lv-qtxt { font-family:'Rajdhani'; font-size:clamp(14px,3.5vw,17px); font-weight:700; color:#fff; line-height:1.65; margin-bottom:20px; }
        .lv-opt  { width:100%; text-align:left; padding:12px 14px; background:rgba(15,5,35,.7); border:1px solid rgba(180,0,255,.18); color:rgba(200,160,255,.9); font-family:'Rajdhani'; font-size:clamp(12px,3vw,14px); font-weight:600; cursor:pointer; margin-bottom:8px; display:flex; align-items:center; gap:10px; transition:all .2s; letter-spacing:.5px; position:relative; overflow:hidden; }
        .lv-opt::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,#c084fc08,transparent); opacity:0; transition:opacity .2s; }
        .lv-opt:hover::before { opacity:1; }
        .lv-opt:not(:disabled):hover { border-color:rgba(180,0,255,.5); transform:translateX(4px); }
        .lv-opt.correct { border-color:#34D399; background:rgba(52,211,153,.1); color:#34D399; }
        .lv-opt.wrong   { border-color:#F87171; background:rgba(248,113,113,.1); color:#F87171; }
        .lv-olbl { width:26px; height:26px; flex-shrink:0; display:flex; align-items:center; justify-content:center; border:1px solid rgba(180,0,255,.28); font-size:10px; font-weight:900; font-family:'Orbitron'; background:rgba(15,5,35,.8); }

        .lv-score-num { font-size:clamp(60px,15vw,80px); font-weight:900; line-height:1; font-family:'Orbitron'; animation:sci .6s cubic-bezier(.23,1,.32,1); }
        .lv-preview-modal img { width:100%; max-height:360px; object-fit:contain; border:1px solid rgba(180,0,255,.3); margin-bottom:20px; border-radius:4px; }
        .lv-timeout-icon { animation:timeoutPulse 1.5s ease-in-out infinite; }
      `}</style>

      <div className="lv">
        <div className="lv-grid" />
        <div className="lv-glow" />

        {/* HEADER */}
        <header className="lv-hdr">
          <button className="lv-back" onClick={() => { sounds.click.play(); setShowBack(true); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {!isMobile && "KEMBALI"}
          </button>
          <div className="lv-htitle">
            <h1>PUZZLE GAME</h1>
            <p>{hw.nama.toUpperCase()}</p>
          </div>
          <div className="lv-hdr-right">
            <TimerDisplay seconds={timeLeft} />
            <div className="lv-badge">LVL 6</div>
          </div>
        </header>

        {/* BODY */}
        <div className="lv-body">
          {/* ICON JAM - toggle riwayat */}
          <button
            onClick={() => setShowHistory(h => !h)}
            style={{
              position: "absolute", top: 10, left: 10, zIndex: 20,
              width: 36, height: 36, background: showHistory ? "rgba(180,0,255,.25)" : "rgba(10,2,25,.7)",
              border: "1px solid rgba(180,0,255,.4)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .2s", flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={showHistory ? "#e879f9" : "rgba(180,0,255,.6)"} strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </button>

          {/* PANEL RIWAYAT */}
          {showHistory && (
            <div style={{
              position: "absolute", top: 54, left: 10, zIndex: 30,
              width: 220, maxHeight: "calc(100vh - 130px)",
              background: "rgba(8,2,20,.97)", border: "1px solid rgba(180,0,255,.3)",
              backdropFilter: "blur(12px)", display: "flex", flexDirection: "column",
              overflow: "hidden", boxShadow: "4px 0 24px rgba(0,0,0,.5)",
            }}>
              <HistoryPanel history={history} onClear={clearHistory} />
            </div>
          )}

          {/* CENTER */}
          <div className="lv-center">

            {/* PUZZLE PHASE */}
            {phase === PHASE.PUZZLE && (
              <div className="lv-main">
                {/* BOARD */}
                <div className="lv-board-wrap">
                  <p className="lv-board-label">PAPAN PUZZLE</p>
                  <div
                    className="lv-board"
                    style={{
                      gridTemplateColumns: `repeat(${GRID}, ${PIECE}px)`,
                      gridTemplateRows:    `repeat(${GRID}, ${PIECE}px)`,
                      width:  BOARD_TOTAL + GAP * 2,
                      height: BOARD_TOTAL + GAP * 2,
                      padding: GAP,
                      gap: GAP,
                    }}
                  >
                    {board.map((pi, si) => (
                      <div
                        key={si}
                        className={`lv-slot${dragOver === `s${si}` ? " over" : ""}${showLightning ? " lightning" : ""}`}
                        style={{
                          width: PIECE, height: PIECE,
                          zIndex: pi !== null ? 2 : 1,
                          position: "relative",
                          background: pi !== null ? "transparent" : "rgba(10,2,25,.8)",
                        }}
                        onDragOver={(e) => onDragOverHandler(e, `s${si}`)}
                        onDragLeave={onDragLeave}
                        onDrop={(e) => onDropBoard(e, si)}
                      >
                        {pi !== null ? (
                          <div className="lv-placed" draggable onDragStart={(e) => onDragStartBoard(e, si)}>
                            <PuzzlePiece imgSrc={hw.img} pieceIdx={pi} size={PIECE} grid={GRID} />
                          </div>
                        ) : (
                          <div className="lv-slot-empty" />
                        )}
                      </div>
                    ))}
                    {solved && (
                      <div className="lv-solved-overlay">
                        <p className="lv-solved-txt">SELESAI!</p>
                      </div>
                    )}
                    <div
                      className="lv-lightning-board-overlay"
                      style={{ opacity: showLightning ? 1 : 0, transition: "none" }}
                    >
                      <LottiePreloaded
                        animationData={petirAnim}
                        animRef={petirAnimRef}
                        style={{ width: "100%", height: "100%", mixBlendMode: "screen" }}
                      />
                    </div>
                  </div>

                  {/* Preview + hints */}
                  <div className="lv-preview-row" style={{ width: BOARD_TOTAL + GAP * 2 }}>
                    <button className="lv-prev-btn" onClick={() => setShowPreview(true)}>
                      <span>PREVIEW:</span>
                      <div className="lv-prev-img"><img src={hw.img} alt={hw.nama} /></div>
                    </button>
                    <p className="lv-hint-txt">
                      Seret keping ke papan<br />
                      Tukar posisi keping di papan<br />
                      Seret keping ke tray untuk mengembalikan
                    </p>
                  </div>
                </div>

                {/* TRAY */}
                <div className="lv-tray-wrap">
                  <p className="lv-tray-label">KEPING PUZZLE</p>
                  <div
                    className={`lv-tray${dragOver === "tray" ? " over" : ""}`}
                    style={{
                      gridTemplateColumns: `repeat(${TRAY_COLS}, ${TRAY_PIECE + 12}px)`,
                      gridTemplateRows:    `repeat(${TRAY_ROWS}, ${TRAY_PIECE + 12}px)`,
                    }}
                    onDragOver={(e) => onDragOverHandler(e, "tray")}
                    onDragLeave={onDragLeave}
                    onDrop={onDropTray}
                  >
                    {[...Array(TOTAL).keys()].map((slotIdx) => {
                      const pi = tray[slotIdx];
                      return (
                        <div
                          key={slotIdx}
                          className={`lv-tray-slot${pi !== undefined ? " has-piece" : ""}`}
                          style={{ width: TRAY_PIECE + 12, height: TRAY_PIECE + 12 }}
                        >
                          {pi !== undefined ? (
                            <div className="lv-tray-piece" draggable onDragStart={(e) => onDragStartTray(e, pi)}>
                              <div className="lv-piece-glow" />
                              <PuzzlePiece imgSrc={hw.img} pieceIdx={pi} size={TRAY_PIECE} grid={GRID} />
                            </div>
                          ) : (
                            <div style={{ width: TRAY_PIECE, height: TRAY_PIECE, border: "1px dashed rgba(180,0,255,.08)", opacity: 0.4 }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p style={{ fontSize: 8, color: "rgba(180,0,255,.3)", letterSpacing: 2, fontFamily: "Rajdhani", textAlign: "center" }}>
                    SERET KE PAPAN PUZZLE
                  </p>
                </div>
              </div>
            )}

            {/* QUESTION PHASE */}
            {phase === PHASE.QUESTION && curSoal && (
              <div style={{ width: "100%", maxWidth: 580, padding: "0 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,rgba(180,0,255,.4),transparent)" }} />
                  <p style={{ fontSize: 9, color: attemptColor, letterSpacing: 3, fontFamily: "Rajdhani", whiteSpace: "nowrap" }}>
                    {attemptLabel}
                  </p>
                  <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,transparent,rgba(180,0,255,.4))" }} />
                </div>
                <div className="lv-qcard">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 38, height: 38, overflow: "hidden", border: "1px solid rgba(180,0,255,.3)", flexShrink: 0 }}>
                      <img src={hw.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <p style={{ fontSize: 10, color: "rgba(180,0,255,.55)", letterSpacing: 2, fontFamily: "Rajdhani" }}>
                      {hw.nama.toUpperCase()}
                    </p>
                  </div>
                  <p className="lv-qtxt">{curSoal.q}</p>
                  {curSoal.opts.map((opt, oi) => {
                    let cls = "lv-opt";
                    if (answered) {
                      if (oi === curSoal.ans) cls += " correct";
                      else if (oi === selAns) cls += " wrong";
                    }
                    return (
                      <button key={oi} className={cls} onClick={() => handleAnswer(oi)} disabled={answered}>
                        <span className="lv-olbl">{["A", "B", "C", "D"][oi]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ICON TANDA TANYA - toggle info */}
          <button
            onClick={() => setShowInfo(i => !i)}
            style={{
              position: "absolute", top: 10, right: 10, zIndex: 20,
              width: 36, height: 36, background: showInfo ? "rgba(180,0,255,.25)" : "rgba(10,2,25,.7)",
              border: "1px solid rgba(180,0,255,.4)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .2s", flexShrink: 0,
            }}
          >
            <span style={{
              fontFamily: "'Orbitron',monospace", fontSize: 14, fontWeight: 900,
              color: showInfo ? "#e879f9" : "rgba(180,0,255,.6)", lineHeight: 1,
            }}>?</span>
          </button>

          {/* PANEL INFO */}
          {showInfo && (
            <div style={{
              position: "absolute", top: 54, right: 10, zIndex: 30,
              width: 220, maxHeight: "calc(100vh - 130px)",
              background: "rgba(8,2,20,.97)", border: "1px solid rgba(180,0,255,.3)",
              backdropFilter: "blur(12px)", display: "flex", flexDirection: "column",
              overflow: "hidden", boxShadow: "-4px 0 24px rgba(0,0,0,.5)",
            }}>
              <InfoPanel hw={hw} />
            </div>
          )}
        </div>

        {/* WIN ANIMATION */}
        {showWinAnim && (
          <div className="lv-win-anim">
            <LottieAnim animationData={winAnim} loop={false}
              style={{ width: "100%", height: "100%", mixBlendMode: "screen" }}
              onComplete={() => setShowWinAnim(false)} />
          </div>
        )}

        {/* PREVIEW MODAL */}
        {showPreview && (
          <div className="lv-overlay" onClick={() => setShowPreview(false)}>
            <div className="lv-modal lv-preview-modal" onClick={(e) => e.stopPropagation()}>
              <span className="lv-c tl" /><span className="lv-c tr" />
              <span className="lv-c bl" /><span className="lv-c br" />
              <p style={{ fontSize: 9, letterSpacing: 4, color: "rgba(180,0,255,.5)", marginBottom: 14, fontFamily: "Rajdhani" }}>
                PREVIEW — {hw.nama.toUpperCase()}
              </p>
              <img src={hw.img} alt={hw.nama} />
              <button className="lv-btn lv-btn-s" onClick={() => setShowPreview(false)}>TUTUP</button>
            </div>
          </div>
        )}

        {/* BACK ALERT */}
        {showBack && (
          <div className="lv-overlay">
            <div className="lv-modal">
              <span className="lv-c tl" /><span className="lv-c tr" />
              <span className="lv-c bl" /><span className="lv-c br" />
              <h2 className="lv-mtitle">KELUAR GAME?</h2>
              <p className="lv-mdesc">
                Apakah kamu yakin ingin mengakhiri game?<br />
                <span className="lv-mwarn">Progress puzzle akan hilang.</span>
              </p>
              <div className="lv-macts">
                <button className="lv-btn lv-btn-p" onClick={() => navigate("/game")}>YA, KELUAR</button>
                <button className="lv-btn lv-btn-s" onClick={() => setShowBack(false)}>TIDAK</button>
              </div>
            </div>
          </div>
        )}

        {/* TIMEOUT MODAL */}
        {phase === PHASE.TIMEOUT && (
          <div className="lv-overlay">
            <div className="lv-modal">
              <span className="lv-c tl" /><span className="lv-c tr" />
              <span className="lv-c bl" /><span className="lv-c br" />
              <div className="lv-mtop" style={{ background: "linear-gradient(90deg,#7c3aed,#F87171,#7c3aed)" }} />
              <div style={{ marginBottom: 16 }}>
                <svg className="lv-timeout-icon" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#F87171" strokeWidth="2" />
                </svg>
              </div>
              <h2 className="lv-mtitle" style={{ color: "#F87171", textShadow: "0 0 20px rgba(248,113,113,.7)" }}>WAKTU HABIS!</h2>
              <p className="lv-mdesc">
                Wah, kamu kehabisan waktu! ⏰<br />
                Jangan menyerah, coba lagi dan selesaikan<br />
                puzzle dalam waktu <strong style={{ color: "rgba(200,150,255,.9)" }}>5 menit</strong>.
              </p>
              <div className="lv-macts">
                <button className="lv-btn lv-btn-s" onClick={() => navigate("/game")}>KEMBALI</button>
                <button className="lv-btn lv-btn-r" onClick={initPuzzle}>MULAI ULANG</button>
              </div>
            </div>
          </div>
        )}

        {/* RESULT MODAL */}
        {phase === PHASE.RESULT && (
          <div className="lv-overlay">
            <div className="lv-modal">
              <span className="lv-c tl" /><span className="lv-c tr" />
              <span className="lv-c bl" /><span className="lv-c br" />
              <div className="lv-mtop" style={{ background: `linear-gradient(90deg,#7c3aed,${sc},#7c3aed)` }} />
              <p style={{ fontSize: 9, letterSpacing: 4, color: "rgba(180,0,255,.45)", marginBottom: 4, fontFamily: "Rajdhani" }}>
                SKOR KAMU
              </p>
              <p className="lv-score-num" style={{ color: sc, textShadow: `0 0 40px ${sc}77` }}>{finalScore}</p>
              <p style={{ fontSize: 11, color: "rgba(200,160,255,.45)", fontFamily: "Rajdhani", marginBottom: 14 }}>POIN</p>
              <div style={{ display: "inline-block", padding: "6px 20px", marginBottom: 14, background: `${sc}14`, border: `1px solid ${sc}40` }}>
                <p style={{ fontSize: 12, fontWeight: 900, color: sc, letterSpacing: 3, fontFamily: "Orbitron" }}>{sl}</p>
              </div>
              <div style={{ marginBottom: 12, padding: "10px 16px", background: "rgba(120,0,255,.08)", border: "1px solid rgba(180,0,255,.25)" }}>
                <p style={{ fontSize: 12, color: "rgba(220,180,255,.85)", fontFamily: "Rajdhani", lineHeight: 1.6 }}>
                  Selamat! Kamu telah menyelesaikan<br />
                  <strong style={{ color: "#c084fc", letterSpacing: 1 }}>LEVEL 6 — {hw.nama.toUpperCase()}</strong>
                </p>
              </div>

              {isFirstEverDone && (
                <div style={{ marginBottom: 12, padding: "8px 16px", background: "rgba(52,211,153,.06)", border: "1px solid rgba(52,211,153,.25)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                  <p style={{ fontSize: 11, color: "#34D399", letterSpacing: 2, fontFamily: "Rajdhani", fontWeight: 700 }}>
                    LEVEL 7 TERBUKA!
                  </p>
                </div>
              )}

              {prevScore !== null && (
                <div style={{ marginBottom: 10, padding: "4px 14px", background: "rgba(180,0,255,.06)", border: "1px solid rgba(180,0,255,.2)" }}>
                  <p style={{ fontSize: 10, color: "rgba(180,0,255,.55)", letterSpacing: 2, fontFamily: "Rajdhani" }}>
                    SKOR SEBELUMNYA: {prevScore}
                  </p>
                </div>
              )}
              {isNewRec && (
                <div style={{ marginBottom: 14, padding: "6px 16px", background: "rgba(251,191,36,.08)", border: "1px solid rgba(251,191,36,.28)" }}>
                  <p style={{ fontSize: 10, color: "#FBBF24", letterSpacing: 2, fontFamily: "Rajdhani" }}>
                    🏆 REKOR BARU! Skor tersimpan ke profil.
                  </p>
                </div>
              )}
              <div className="lv-macts" style={{ marginTop: 8 }}>
                <button className="lv-btn lv-btn-s" onClick={() => navigate("/game")}>KEMBALI</button>
                <button className="lv-btn lv-btn-s" onClick={initPuzzle}>MULAI ULANG</button>
                <button className="lv-btn lv-btn-g" onClick={() => navigate("/game/level/7")}>LANJUT →</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}