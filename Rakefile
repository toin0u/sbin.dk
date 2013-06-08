# rake -T to show available tasks

# Usage: rake
desc "Show available commands (tasks)"
task :default do
    puts "server: build files and launch local dev server"
    puts "release: push repository to VPS"
    puts "publish: push repository to Github"
    puts "post [new post name]: create a new post file like YYYY-MM-DD-new-post-name.md"
end

# Usage: rake server
desc "Build files and launch local dev server"
task :server do
    puts "Building files and launching local dev server..."
    sh "jekyll server --watch"
end

# Usage: rake release
desc "Push repository to VPS"
task :release => :publish do
    puts "Pushing repository to VPS..."
    sh "git push deploy master"
end

# Usage: rake publish
desc "Push repository to Github"
task :publish do
    puts "Pushing repository to Github..."
    sh "git push origin master"
end

# Usage: rake post "New post name"
desc "Create a new post file like YYYY-MM-DD-new-post-name.md"
task :post do
    # get last argument as title which is a task
    title = ARGV.last
    # title task will do nothing
    task title.to_sym do ; end
    dirname = File.join(".", "_posts")
    if not FileTest.directory?(dirname)
        abort("rake aborted: #{dirname} directory is not found!")
    end
    date = Time.now.strftime('%F')
    fulldate = Time.now.strftime('%F %T')
    slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
    filename = "#{date}-#{slug}.md"
    fullpath = File.join(dirname, filename)
    if File.exist?(fullpath)
        abort("rake aborted: #{fullpath} already exists!")
    end
    puts "Creating a new post file called #{filename} with YAML front matter..."
    File.open(fullpath, 'w') do |post|
        post.puts "---"
        post.puts "layout: post"
        post.puts "change_frequency: weekly"
        post.puts "priority: 0.8"
        post.puts "published: true"
        post.puts "comments: true"
        post.puts "date: #{fulldate}"
        post.puts "title: #{title}"
        post.puts "summary: "
        post.puts "category: "
        post.puts "tags: "
        post.puts "redirects:"
        post.puts "---"
        post.puts ""
    end
    puts "Opening #{fullpath} in Sublime Text 2..."
    sh "subl #{fullpath}"
end