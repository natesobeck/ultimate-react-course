import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://fjlavxnjbyacrgnujnsc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqbGF2eG5qYnlhY3JnbnVqbnNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNjU4NjksImV4cCI6MjAzNzg0MTg2OX0.s-KIoEHVZMD95L-BUwq6Y0ya4e9CpzlUThEYnUWyRrg"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
