# Outputs the reading time, as a number

# Read this in "4 minutes"
# Usage: Read this in {{ page.content | reading_time }}

WORDS_PER_MINUTE = 180

def calculate_time(input)
  words = input.split.size
  minutes = (words.to_f / WORDS_PER_MINUTE).round
  return minutes, 'Min'
end

def output(minutes, label)
  "<div class='reading-time'><span class='reading-time__min'>#{minutes}</span> <span class='reading-time__label'>#{label}</span></div>"
end

module ReadingTimeFilterAsInteger
  def reading_time(input)
    minutes, label = calculate_time(input)
    minutes > 0 ? output(minutes, label): output('1', 'Min')
  end

  Liquid::Template.register_filter(ReadingTimeFilterAsInteger)
end