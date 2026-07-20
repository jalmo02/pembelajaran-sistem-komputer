function getCurrentUsername() {
  try {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    return user?.username || null
  } catch {
    return null
  }
}

function getUserKey(baseKey) {
  const username = getCurrentUsername()
  if (!username) {
    // Kalau belum login, fallback ke key biasa (jarang kepake, tapi jaga-jaga)
    return baseKey
  }
  return `${baseKey}__${username}`
}

// Ambil data (otomatis JSON.parse). defaultValue dikembalikan kalau belum ada data.
export function getUserItem(baseKey, defaultValue = null) {
  const raw = localStorage.getItem(getUserKey(baseKey))
  if (raw === null) return defaultValue
  try {
    return JSON.parse(raw)
  } catch {
    return raw // kalau bukan JSON (string biasa), kembalikan apa adanya
  }
}

// Simpan data (otomatis JSON.stringify)
export function setUserItem(baseKey, value) {
  localStorage.setItem(getUserKey(baseKey), JSON.stringify(value))
}

// Hapus satu key data game milik user aktif
export function removeUserItem(baseKey) {
  localStorage.removeItem(getUserKey(baseKey))
}

export function clearAllUserData(baseKeys = []) {
  baseKeys.forEach(key => removeUserItem(key))
}