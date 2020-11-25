
const jimp = require('jimp')
const space = require('color-space');
const deltaE = require('delta-e')

const original = async() => {
  const img = await jimp.read('images/teste2-original.jpg').then(image => {
    return image
  })
  return img
}

const a2 = async() => {
  const img = await jimp.read('images/teste2-A2.jpg').then(image => {
    return image
  })
  return img
}

const b2 =  async() => {
  const img = await jimp.read('images/teste2-B2.jpg').then(image => {
    return image
  })
  return img
}

const c2 =async() => {
  const img = await jimp.read('images/teste2-C2.jpg').then(image => {
    return image
  })
  return img
}

const d2 =  async() => {
  const img = await jimp.read('images/teste2-D2.jpg').then(image => {
    return image
  })
  return img
}

async function clo() {
  let o =  await original()
  let a =  await a2()
  let b =  await b2()
  let c =  await c2()
  let d =  await d2()
  var diffa = jimp.diff(o, a); 
  var diffb = jimp.diff(o, b); 
  var diffc = jimp.diff(o, c); 
  var diffd = jimp.diff(o, d); 
  diffa.image.write('images/diffa.jpg')
  diffb.image.write('images/diffb.jpg')
  diffc.image.write('images/diffc.jpg')
  diffd.image.write('images/diffd.jpg')

  let distancea = jimp.distance(o, a)
  let distanceb = jimp.distance(o, b)
  let distancec = jimp.distance(o, c)
  let distanced = jimp.distance(o, d)

  console.log('distancia A2 :>> ', distancea);
  console.log('distancia B2 :>> ', distanceb);
  console.log('distancia C2 :>> ', distancec);
  console.log('distancia D2 :>> ', distanced);
  console.log('--------------------- ');
  console.log('diferenca A2 :>> ', diffa.percent);
  console.log('diferenca B2 :>> ', diffb.percent);
  console.log('diferenca C2 :>> ', diffc.percent);
  console.log('diferenca D2 :>> ', diffd.percent);
  // console.log('o :>> ', o);
}

async function scan(img) {
  img = await img
  
  let red = []
  let green = []
  let blue = []
  let alpha = []
  let pixelsCount = 0
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
    // x, y is the position of this pixel on the image
    // idx is the position start position of this rgba tuple in the bitmap Buffer
    // this is the image
    
    red.push(this.bitmap.data[idx + 0]);
    green.push(this.bitmap.data[idx + 1]);
    blue.push(this.bitmap.data[idx + 2]);
    alpha.push(this.bitmap.data[idx + 3]);
    pixelsCount++
    
    // rgba values run from 0 - 255
    // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
  });

  let avRed = red.reduce((pixels, pixel) => 
    pixels + pixel    
  ) / pixelsCount

   let avGreen = green.reduce((pixels, pixel) => 
    pixels + pixel    
  ) / pixelsCount

   let avBlue = blue.reduce((pixels, pixel) => 
    pixels + pixel    
  ) / pixelsCount

  let avAlpha = alpha.reduce((pixels, pixel) => 
  pixels + pixel    
) / pixelsCount
  
let intColor = jimp.rgbaToInt(avRed, avGreen, avBlue, avAlpha)

  new jimp(256, 256, intColor, (err, image) => {
    image.write('images/media.jpg')
  });
  
  const lab = space.rgb.lab([avRed,avGreen,avBlue])
  return {
    L: lab[0],
    A: lab[1],
    B: lab[2]
  }


}


const deltaEDiff = async () => {
  await console.log('Comparação A2 :>> ', deltaE.getDeltaE00(await scan(a2()),await scan(original())));
  await console.log('Comparação B2 :>> ', deltaE.getDeltaE00(await scan(b2()),await scan(original())));
  await console.log('Comparação C2 :>> ', deltaE.getDeltaE00(await scan(c2()),await scan(original())));
  await console.log('Comparação D2 :>> ', deltaE.getDeltaE00(await scan(d2()),await scan(original())));
}

deltaEDiff()

  // original.greyscale()
  // original.write('images/teste2.jpg')
  
// var diff = Jimp.diff(image1, image2); 
// diff.image; 
// diff.percent; 