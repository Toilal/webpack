const path = require('path')

const copy = require('./lib/metalsmith-copy')
const deIndent = require('./lib/de-indent')

const srcRegexp = /^src[\/|\\]/g
const libRegexp = /^(.*\.)(lib\.)(ts|js)$/g
const componentsRegexp = /^(.*)([\/|\\]components)([\/|\\].*)$/g

module.exports = function (metalsmith, opts, helpers) {
  function libraryProjectCopy (files, metalsmith, done) {
    if (metalsmith.metadata().projectType === 'lib') {
      copy({
        move: true,
        transform: function (file) {
          // Move all files but .lib files and components directory to app directory
          if (file.match(srcRegexp)) {
            console.log(file)
            if (!file.match(libRegexp) && !file.match(componentsRegexp)) {
              file = 'app' + file.substring(3)
            }

            // Rename .lib files
            file = file.replace(libRegexp, '$1$3')
          }
          return file
        }
      })(files, metalsmith, done)
    } else {
      done(null, files)
    }
  }

  metalsmith.use(libraryProjectCopy)

  function sfcExternals (files, metalsmith, done) {
    function buildTagRegex(tag) {
      // Sorry for that, but vue-cli doesn't support custom dependencies to parse vue files cleanly
      return new RegExp('^(<' + tag + '.*?)(\\slang="(.*)")?(.*?>)([\\s|\\S]*)^(<\\/' + tag + '>)', 'm')
    }

    for (tag of ['template', 'style', 'script']) {
      if (metalsmith.metadata().sfcExternals[tag]) {
        const regex = buildTagRegex(tag)

        for (const vueFilepath of Object.keys(files).filter(f => f.endsWith('.vue'))) {
          const vueParsed = path.parse(vueFilepath)
          const vueDirectory = vueParsed.dir.replace('\\', '/')
          const vueBaseName = (vueParsed.name + vueParsed.ext).replace('\\', '/')

          const vueFile = files[vueFilepath]
          const text = vueFile.contents.toString('utf8')

          const match = regex.exec(text)
          if (!match) continue

          let ext = match[3]
          if (!ext) {
            if (tag === 'template') {
              ext = 'html'
            } else if (tag === 'style') {
              ext = 'css'
            } else if (tag === 'script') {
              ext = 'js'
            }
          }

          const externalFilename = vueBaseName.replace(/vue$/, ext)

          const replacedText = text.replace(regex, '$1 src="./' + externalFilename + '"$4\n$6')

          const vueContent = Buffer.from(replacedText, 'utf8')
          vueFile.contents = vueContent

          const contents = Buffer.from(deIndent(match[5].replace(/\r?\n|\r/, '')))

          const scriptFilepath = vueDirectory + '/' + externalFilename
          files[scriptFilepath] = { contents }
        }
      }
    }

    done(null, files)
  }

  metalsmith.use(sfcExternals)
}