json.data(@data) { |d| json.extract!(d, :content, :status) }
