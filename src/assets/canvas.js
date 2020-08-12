let size = Number

function project3D(x, y, z, vans) {
  let p, d;
  x -= vans.camX;
  y -= vans.camY - 8;
  z -= vans.camZ;
  p = Math.atan2(x, z);
  d = Math.sqrt(x * x + z * z);
  x = Math.sin(p - vans.yaw) * d;
  z = Math.cos(p - vans.yaw) * d;
  p = Math.atan2(y, z);
  d = Math.sqrt(y * y + z * z);
  y = Math.sin(p - vans.pitch) * d;
  z = Math.cos(p - vans.pitch) * d;
  let rx1 = -1000;
  let ry1 = 1;
  let rx2 = 1000;
  let ry2 = 1;
  let rx3 = 0;
  let ry3 = 0;
  let rx4 = x;
  let ry4 = z;
  let uc = (ry4 - ry3) * (rx2 - rx1) - (rx4 - rx3) * (ry2 - ry1);
  let ua = ((rx4 - rx3) * (ry1 - ry3) - (ry4 - ry3) * (rx1 - rx3)) / uc;
  let ub = ((rx2 - rx1) * (ry1 - ry3) - (ry2 - ry1) * (rx1 - rx3)) / uc;
  if (!z) z = 0.000000001;
  if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
    return {
      x: vans.cx + (rx1 + ua * (rx2 - rx1)) * vans.scale,
      y: vans.cy + y / z * vans.scale,
      d: (x * x + y * y + z * z)
    }
  } else {
    return {d: -1}
  }
}

function elevation(x, y, z) {
  let dist = Math.sqrt(x * x + y * y + z * z);
  if (dist && z / dist >= -1 && z / dist <= 1) return Math.acos(z / dist);
  return 0.00000001
}

function rgb(col) {
  col += 0.000001;
  let r = parseInt((0.5 + Math.sin(col) * 0.5) * 16);
  let g = parseInt((0.5 + Math.cos(col) * 0.5) * 16);
  let b = parseInt((0.5 - Math.sin(col) * 0.5) * 16);
  return "#" + r.toString(16) + g.toString(16) + b.toString(16)
}

function interpolateColors(RGB1, RGB2, degree) {
  let w2 = degree;
  let w1 = 1 - w2;
  return [w1 * RGB1[0] + w2 * RGB2[0], w1 * RGB1[1] + w2 * RGB2[1], w1 * RGB1[2] + w2 * RGB2[2]]
}

function rgbArray(col) {
  col += 0.000001;
  let r = parseInt((0.5 + Math.sin(col) * 0.5) * 256);
  let g = parseInt((0.5 + Math.cos(col) * 0.5) * 256);
  let b = parseInt((0.5 - Math.sin(col) * 0.5) * 256);
  return [r, g, b]
}

function colorString(arr) {
  let r = parseInt(arr[0]);
  let g = parseInt(arr[1]);
  let b = parseInt(arr[2]);
  return "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2)
}

function process(vans) {
  let p, d, t, x, y, z;
  if (vans.points.length < vans.initParticles) {
    let i = 5
    while (i--) {
      spawnParticle(vans);
    }
  }
  p = Math.atan2(vans.camX, vans.camZ);
  d = Math.sqrt(vans.camX * vans.camX + vans.camZ * vans.camZ);
  d -= Math.sin(vans.frameNo / 80) / 25;
  t = Math.cos(vans.frameNo / 300) / 165;
  vans.camX = Math.sin(p + t) * d;
  vans.camZ = Math.cos(p + t) * d;
  vans.camY = -Math.sin(vans.frameNo / 220) * 15;
  vans.yaw = Math.PI + p + t;
  vans.pitch = elevation(vans.camX, vans.camZ, vans.camY) - Math.PI / 2;
  for (let i = 0; i < vans.points.length; ++i) {
    x = vans.points[i].x;
    y = vans.points[i].y;
    z = vans.points[i].z;
    d = Math.sqrt(x * x + z * z) / 1.0075;
    t = .1 / (1 + d * d / 5);
    p = Math.atan2(x, z) + t;
    vans.points[i].x = Math.sin(p) * d;
    vans.points[i].z = Math.cos(p) * d;
    vans.points[i].y += vans.points[i].vy * t * ((Math.sqrt(vans.distributionRadius) - d) * 2);
    if (vans.points[i].y > vans.vortexHeight / 2 || d < .25) {
      vans.points.splice(i, 1);
      spawnParticle(vans)
    }
  }
}

function drawFloor(vans) {
  let x, y, z, d, point, a;
  for (let i = -25; i <= 25; i += 1) {
    for (let j = -25; j <= 25; j += 1) {
      x = i * 2;
      z = j * 2;
      y = vans.floor;
      d = Math.sqrt(x * x + z * z);
      point = project3D(x, y - d * d / 85, z, vans);
      if (point.d !== -1) {
        size = 1 + 15000 / (1 + point.d);
        a = 0.15 - Math.pow(d / 50, 4) * 0.15;
        if (a > 0) {
          vans.ctx.fillStyle = colorString(interpolateColors(rgbArray(d / 26 - vans.frameNo / 40), [0, 128, 32], .5 + Math.sin(d / 6 - vans.frameNo / 8) / 2));
          vans.ctx.globalAlpha = a;
          vans.ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size)
        }
      }
    }
  }
  vans.ctx.fillStyle = "#82f";
  for (let i = -25; i <= 25; i += 1) {
    for (let j = -25; j <= 25; j += 1) {
      x = i * 2;
      z = j * 2;
      y = -vans.floor;
      d = Math.sqrt(x * x + z * z);
      point = project3D(x, y + d * d / 85, z, vans);
      if (point.d !== -1) {
        size = 1 + 15000 / (1 + point.d);
        a = 0.15 - Math.pow(d / 50, 4) * 0.15;
        if (a > 0) {
          vans.ctx.fillStyle = colorString(interpolateColors(rgbArray(-d / 26 - vans.frameNo / 40), [32, 0, 128], .5 + Math.sin(-d / 6 - vans.frameNo / 8) / 2));
          vans.ctx.globalAlpha = a;
          vans.ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size)
        }
      }
    }
  }
}

function sortFunction(a, b) {
  return b.dist - a.dist
}

function draw(vans) {
  vans.ctx.globalAlpha = .15;
  vans.ctx.fillStyle = "#000";
  vans.ctx.fillRect(0, 0, vans.canvas.width, vans.canvas.height);
  drawFloor(vans);
  let point, x, y, z, a, d;
  for (let i = 0; i < vans.points.length; ++i) {
    x = vans.points[i].x;
    y = vans.points[i].y;
    z = vans.points[i].z;
    point = project3D(x, y, z, vans);
    if (point.d !== -1) {
      vans.points[i].dist = point.d;
      size = 1 + vans.points[i].radius / (1 + point.d);
      d = Math.abs(vans.points[i].y);
      a = .8 - Math.pow(d / (vans.vortexHeight / 2), 1000) * .8;
      vans.ctx.globalAlpha = a >= 0 && a <= 1 ? a : 0;
      vans.ctx.fillStyle = rgb(vans.points[i].color);
      if (point.x > -1 && point.x < vans.canvas.width && point.y > -1 && point.y < vans.canvas.height) vans.ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size)
    }
  }
  vans.points.sort(sortFunction)
}

function spawnParticle(vans) {
  let pt = {}, p, ls;
  p = Math.PI * 2 * Math.random();
  ls = Math.sqrt(Math.random() * vans.distributionRadius);
  pt.x = Math.sin(p) * ls;
  pt.y = -vans.vortexHeight / 2;
  pt.vy = vans.initV / 20 + Math.random() * vans.initV;
  pt.z = Math.cos(p) * ls;
  pt.radius = 200 + 800 * Math.random();
  pt.color = pt.radius / 1000 + vans.frameNo / 250;
  vans.points.push(pt)
}

function frame(element, vans) {
  if (vans === undefined) {
    vans = {};
    vans.canvas = element;
    vans.ctx = vans.canvas.getContext("2d");
    vans.canvas.width = document.body.clientWidth;
    vans.canvas.height = document.body.clientHeight;
    window.addEventListener("resize", function () {
      vans.canvas.width = document.body.clientWidth;
      vans.canvas.height = document.body.clientHeight;
      vans.cx = vans.canvas.width / 2;
      vans.cy = vans.canvas.height / 2
    }, true);
    vans.frameNo = 0;
    vans.camX = 0;
    vans.camY = 0;
    vans.camZ = -14;
    vans.pitch = elevation(vans.camX, vans.camZ, vans.camY) - Math.PI / 2;
    vans.yaw = 0;
    vans.cx = vans.canvas.width / 2;
    vans.cy = vans.canvas.height / 2;
    vans.bounding = 10;
    vans.scale = 500;
    vans.floor = 26.5;
    vans.points = [];
    vans.initParticles = 1000;
    vans.initV = .01;
    vans.distributionRadius = 800;
    vans.vortexHeight = 25
  }
  vans.frameNo++;
  requestAnimationFrame(function () {
    frame(vans.canvas, vans)
  });
  process(vans);
  draw(vans)
}


export default frame
