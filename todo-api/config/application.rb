require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TodoApi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # CORS設定を追加
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000' # ReactアプリのURLを設定
        resource '*', headers: :any, methods: [:get, :post, :put, :delete, :options]
      end
    end

    
    config.api_only = true
  end
end
