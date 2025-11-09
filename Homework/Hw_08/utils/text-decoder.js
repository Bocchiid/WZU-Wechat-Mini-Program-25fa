// utils/text-decoder.js

/**
 * ArrayBuffer 转 UTF-8 字符串（真机兼容）
 */
function arrayBufferToString(buffer) {
  if (!buffer) return '';
  
  const uint8Array = new Uint8Array(buffer);
  const length = uint8Array.length;
  let result = '';
  let i = 0;

  // 处理 UTF-8 编码
  while (i < length) {
    const byte1 = uint8Array[i++];
    
    if (byte1 < 0x80) {
      // 单字节字符 (0xxxxxxx)
      result += String.fromCharCode(byte1);
    } else if (byte1 < 0xE0) {
      // 双字节字符 (110xxxxx 10xxxxxx)
      const byte2 = uint8Array[i++];
      result += String.fromCharCode(((byte1 & 0x1F) << 6) | (byte2 & 0x3F));
    } else if (byte1 < 0xF0) {
      // 三字节字符 (1110xxxx 10xxxxxx 10xxxxxx)
      const byte2 = uint8Array[i++];
      const byte3 = uint8Array[i++];
      result += String.fromCharCode(
        ((byte1 & 0x0F) << 12) | ((byte2 & 0x3F) << 6) | (byte3 & 0x3F)
      );
    } else {
      // 四字节字符 (11110xxx 10xxxxxx 10xxxxxx 10xxxxxx)
      const byte2 = uint8Array[i++];
      const byte3 = uint8Array[i++];
      const byte4 = uint8Array[i++];
      let codePoint = ((byte1 & 0x07) << 18) | ((byte2 & 0x3F) << 12) | 
                      ((byte3 & 0x3F) << 6) | (byte4 & 0x3F);
      // 转换为代理对
      codePoint -= 0x10000;
      result += String.fromCharCode(
        0xD800 + (codePoint >> 10),
        0xDC00 + (codePoint & 0x3FF)
      );
    }
  }
  
  return result;
}

/**
 * 直接解码函数（推荐使用）
 */
export function decodeArrayBuffer(buffer) {
  return arrayBufferToString(buffer);
}